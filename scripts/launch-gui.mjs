// vibeX GUI launcher — boots the vibeX engine and opens the UI in a standalone app window.
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import net from 'node:net';
import os from 'node:os';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, '..'); // vibeX home: AGENTS.md, .dsh, node-app
const dshBin = join(root, 'node-app', 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js');
const dshHome = join(root, '.dsh');
const env = { ...process.env, DSH_HOME: dshHome };
const PORT = 3080;
const LAN_MODE = process.env.VIBEX_LAN === '1';

console.log('');
console.log('  ============================================');
console.log(LAN_MODE ? '    vibeX is starting in PHONE mode...' : '    vibeX GUI is starting...');
console.log('    Boot can take 2-5 minutes. Keep this open.');
console.log('    A dedicated app window will open when ready.');
if (LAN_MODE) console.log('    Your phone can connect over the same Wi-Fi.');
console.log('  ============================================');
console.log('');

function lanAddress() {
  const wireless = [];
  const wired = [];
  const other = [];
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    if (/vmware|virtualbox|vbox|hyper-?v|vethernet|loopback|wsl|docker|tap|tun|tailscale|zerotier/i.test(name)) continue;
    for (const info of interfaces[name] || []) {
      if (info.family !== 'IPv4' || info.internal) continue;
      if (/wi-?fi|wlan|wireless/i.test(name)) wireless.push(info.address);
      else if (/ethernet/i.test(name)) wired.push(info.address);
      else other.push(info.address);
    }
  }
  return wireless[0] || wired[0] || other[0];
}

const lan = LAN_MODE ? lanAddress() : undefined;
if (LAN_MODE && !lan) {
  console.log('  No LAN IPv4 address found. Connect this PC to Wi-Fi or run vibeX normally.');
  process.exit(1);
}
if (LAN_MODE) console.log(`  Phone mode: serving on ${lan}:${PORT} (same Wi-Fi only).\n`);

function portInUse(port) {
  return new Promise((resolve) => {
    const sock = net.connect({ host: '127.0.0.1', port }, () => {
      sock.destroy();
      resolve(true);
    });
    sock.on('error', () => resolve(false));
    sock.setTimeout(800, () => { sock.destroy(); resolve(false); });
  });
}

function findPidOnPort(port) {
  try {
    if (process.platform === 'win32') {
      const out = execFileSync('netstat', ['-ano'], { encoding: 'utf8' });
      for (const line of out.split(/\r?\n/)) {
        if (!/LISTENING/i.test(line)) continue;
        const cols = line.trim().split(/\s+/);
        if (cols.length >= 5 && cols[1].endsWith(`:${port}`)) return Number(cols[4]);
      }
      return null;
    }
    try {
      const out = execFileSync('ss', ['-ltnpH', `sport = :${port}`], { encoding: 'utf8' });
      const m = out.match(/pid=(\d+)/);
      if (m) return Number(m[1]);
    } catch { /* ss may be missing */ }
    const out = execFileSync('lsof', ['-ti', `tcp:${port}`, '-sTCP:LISTEN'], { encoding: 'utf8' });
    const first = out.trim().split(/\s+/)[0];
    return first ? Number(first) : null;
  } catch {
    return null;
  }
}

function processImageName(pid) {
  try {
    if (process.platform === 'win32') {
      const out = execFileSync('tasklist', ['/FI', `PID eq ${pid}`, '/FO', 'CSV', '/NH'], { encoding: 'utf8' });
      const m = out.match(/^"([^"]+)"/m);
      return m ? m[1].toLowerCase() : '';
    }
    return execFileSync('ps', ['-p', String(pid), '-o', 'comm='], { encoding: 'utf8' }).trim().toLowerCase();
  } catch {
    return '';
  }
}

function signalProcess(pid, force = false) {
  if (process.platform === 'win32') {
    const args = ['/PID', String(pid)];
    if (force) args.push('/F');
    execFileSync('taskkill', args, { stdio: 'ignore' });
    return;
  }
  execFileSync('kill', [force ? '-KILL' : '-TERM', String(pid)], { stdio: 'ignore' });
}

async function waitForPortFree(attempts = 20) {
  for (let i = 0; i < attempts; i++) {
    if (!(await portInUse(PORT))) return true;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
}

async function stopStaleServer(pid) {
  try {
    signalProcess(pid);
  } catch {
    if (!(await portInUse(PORT))) return true;
  }
  if (await waitForPortFree()) return true;
  if (findPidOnPort(PORT) !== pid) return false;
  try {
    signalProcess(pid, true);
  } catch {
    return !(await portInUse(PORT));
  }
  return waitForPortFree();
}

async function clearStaleServer() {
  if (!(await portInUse(PORT))) return true;
  const pid = findPidOnPort(PORT);
  if (!pid) {
    console.log(`  Port ${PORT} is busy and the owner could not be identified. Close the other vibeX window and retry.`);
    return false;
  }
  const image = processImageName(pid);
  if (!/node/.test(image)) {
    console.log(`  Port ${PORT} is held by "${image}" (PID ${pid}), which is not vibeX. Close it and retry.`);
    return false;
  }
  console.log(`  A stale vibeX server (PID ${pid}) is still on port ${PORT} — stopping it...`);
  if (await stopStaleServer(pid)) {
    console.log('  Port freed. Continuing...\n');
    return true;
  }
  console.log(`  Port ${PORT} is still busy after stopping PID ${pid}. Retry in a moment.`);
  return false;
}

function linuxBrowser() {
  const names = [
    'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser',
    'brave-browser', 'microsoft-edge', 'microsoft-edge-stable',
  ];
  for (const name of names) {
    try {
      const found = execFileSync('which', [name], { encoding: 'utf8' }).trim();
      if (found) return found;
    } catch { /* try the next one */ }
  }
  return null;
}

function openAppWindow(url) {
  if (opened) return;
  opened = true;
  const guiProfile = join(dshHome, 'gui-window-profile');
  if (process.platform !== 'win32') {
    const browser = linuxBrowser();
    if (browser) {
      const args = [`--app=${url}`, '--window-size=1360,900', `--user-data-dir=${guiProfile}`, '--class=vibeX'];
      // Chrome refuses to run as root without these, which matters on Kali.
      if (typeof process.getuid === 'function' && process.getuid() === 0) {
        args.push('--no-sandbox', '--disable-dev-shm-usage');
      }
      spawn(browser, args, { detached: true, stdio: 'ignore' }).unref();
      console.log('\n  vibeX GUI window opened. This console keeps the server alive.\n');
    } else {
      spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
      console.log('\n  No Chrome/Chromium found — opened in your default browser instead.\n');
    }
    console.log('  IMPORTANT: always open vibeX from this launcher (or the saved URL below).');
    console.log('  Typing 127.0.0.1:3080 by hand will show "authentication required".\n');
    return;
  }
  const browserCandidates = [
    process.env['ProgramFiles(x86)'] && join(process.env['ProgramFiles(x86)'], 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    process.env.ProgramFiles && join(process.env.ProgramFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    process.env.ProgramFiles && join(process.env.ProgramFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    process.env['ProgramFiles(x86)'] && join(process.env['ProgramFiles(x86)'], 'Google', 'Chrome', 'Application', 'chrome.exe'),
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe'),
  ].filter(Boolean);
  const browser = browserCandidates.find(existsSync);
  if (browser) {
    spawn(browser, [
      `--app=${url}`,
      '--window-size=1360,900',
      `--user-data-dir=${guiProfile}`,
    ], { detached: true, stdio: 'ignore' }).unref();
    console.log('\n  vibeX GUI window opened. This console keeps the server alive.\n');
  } else {
    spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
    console.log('\n  No Edge/Chrome found — opened in your default browser instead.\n');
  }
  console.log('  IMPORTANT: always open vibeX from this launcher (or the saved URL below).');
  console.log('  Typing 127.0.0.1:3080 by hand will show "authentication required".\n');
}

let opened = false;
let buffer = '';
let child = null;

function watch(chunk) {
  process.stdout.write(chunk);
  buffer += chunk.toString();
  const m = buffer.match(/https?:\/\/[^\s"]+token=[^\s"]+/);
  if (m) {
    // Persist the tokenised URL so a reopened window can use it without guessing.
    try {
      mkdirSync(dshHome, { recursive: true });
      writeFileSync(join(dshHome, 'last-url.txt'), m[0] + '\r\n', 'utf8');
    } catch { /* non-fatal */ }
    openAppWindow(m[0]);
    if (LAN_MODE) {
      console.log('  --------------------------------------------');
      console.log('  On your phone (same Wi-Fi), open this exact link:');
      console.log('  ' + m[0]);
      console.log('');
      console.log('  Add it to your home screen for an app-like icon.');
      if (process.platform === 'win32') {
        console.log('  If it does not load, allow Node.js on private networks');
        console.log('  in the Windows Firewall prompt, then retry.');
      } else {
        console.log('  If it does not load, open TCP ' + PORT + ' in this machine\'s firewall, e.g.');
        console.log('  sudo ufw allow ' + PORT + '/tcp');
      }
      console.log('  SECURITY: anyone with this link can access the full session. Keep it private and share only with trusted devices.');
      console.log('  Keep this console open while the phone is connected.');
      console.log('  --------------------------------------------');
      console.log('');
    }
  }
}

async function start() {
  if (!(await clearStaleServer())) process.exit(1);

  const args = [dshBin, 'web', '--no-open'];
  if (LAN_MODE) {
    args.push('--host', lan, '--public-url', `http://${lan}:${PORT}`, '--trusted-host', `${lan}:${PORT}`);
  }
  child = spawn(process.execPath, args, {
    cwd: root, env, stdio: ['ignore', 'pipe', 'pipe'],
  }); // workspace stays vibeX home so AGENTS.md is always the active brief

  child.stdout.on('data', watch);
  child.stderr.on('data', watch);
  child.on('exit', (code) => {
    console.log(`\n  vibeX server exited (code ${code ?? 0}).`);
    process.exit(code ?? 0);
  });
}

setTimeout(() => {
  if (!opened) console.log('\n  [still booting... if this exceeds 10 minutes, close and retry]\n');
}, 10 * 60 * 1000);

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => { if (child) child.kill(); process.exit(0); });
}

start();
