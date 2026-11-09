import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dshBin = join(root, 'node-app', 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js');
const allowedModes = new Set(['blue-team', 'red-team', 'research-mode']);
const allowedPermissionModes = new Set(['read-only', 'workspace-write']);
const args = process.argv.slice(2);
let mode = 'blue-team';
let modeProvided = false;
let permissionMode = 'read-only';

for (let index = 0; index < args.length;) {
  const arg = args[index];
  if (arg === '--mode') {
    const value = args[index + 1];
    if (!value) {
      console.error('CIPHER CLI: --mode requires blue-team, red-team, or research-mode.');
      process.exit(2);
    }
    mode = value;
    modeProvided = true;
    args.splice(index, 2);
    continue;
  }
  if (arg.startsWith('--mode=')) {
    mode = arg.slice('--mode='.length);
    modeProvided = true;
    args.splice(index, 1);
    continue;
  }
  if (arg === '--permission-mode') {
    const value = args[index + 1];
    if (!value) {
      console.error('CIPHER CLI: --permission-mode requires read-only or workspace-write.');
      process.exit(2);
    }
    permissionMode = value;
    index += 2;
    continue;
  }
  if (arg.startsWith('--permission-mode=')) {
    permissionMode = arg.slice('--permission-mode='.length);
  }
  index++;
}

if (!allowedModes.has(mode)) {
  console.error(`CIPHER CLI: unsupported mode "${mode}". Use blue-team, red-team, or research-mode.`);
  process.exit(2);
}

if (!allowedPermissionModes.has(permissionMode)) {
  console.error(`CIPHER CLI: unsupported permission mode "${permissionMode}". Use read-only or workspace-write.`);
  process.exit(2);
}

function printHelp() {
  console.log(`CIPHER CLI

Usage: CIPHER-CLI.sh [options] <task>
       CIPHER-CLI.bat [options] <task>

Options:
  --mode <mode>                  blue-team (default), red-team, or research-mode
  --session-id <id>              Continue a previous headless session
  --permission-mode <mode>       read-only (default) or workspace-write
  --json                         Print machine-readable run events
  --add-dir <absolute-path>      Allow an additional workspace directory
  -                              Read the task from standard input
  -h, --help                     Show this help

With no task arguments, CIPHER asks for a mode and task interactively.
The CLI runs one task per invocation and has no live approval prompt.`);
}

if (args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

if (!existsSync(dshBin)) {
  console.error('CIPHER CLI: dependencies are missing. Run "npm run setup" from the project root.');
  process.exit(1);
}

if (args.length === 0 && !process.stdin.isTTY) {
  printHelp();
  process.exit(0);
}

if (args.length === 0) {
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  try {
    if (!modeProvided) {
      const answer = (await prompt.question('Choose mode: [1] Blue Team (default), [2] Red Team, [3] Research Mode: '))
        .trim()
        .toLowerCase();
      const choices = {
        '': 'blue-team',
        '1': 'blue-team',
        blue: 'blue-team',
        'blue-team': 'blue-team',
        '2': 'red-team',
        red: 'red-team',
        'red-team': 'red-team',
        '3': 'research-mode',
        research: 'research-mode',
        'research-mode': 'research-mode',
      };
      if (!Object.hasOwn(choices, answer)) {
        console.error('CIPHER CLI: choose 1, 2, or 3 (or enter a mode name).');
        process.exitCode = 2;
      } else {
        mode = choices[answer];
      }
    }

    if (process.exitCode !== 2) {
      const task = (await prompt.question('What should CIPHER do? ')).trim();
      if (!task) {
        console.error('CIPHER CLI: enter a task to continue.');
        process.exitCode = 2;
      } else {
        args.push(task);
      }
    }
  } finally {
    prompt.close();
  }
  if (process.exitCode === 2) process.exit(2);
}

const dshArgs = ['--profile', 'headless', ...args];
console.error(`CIPHER CLI starting in ${mode} mode (${permissionMode}).`);

const result = spawnSync(process.execPath, [dshBin, ...dshArgs], {
  cwd: root,
  env: {
    ...process.env,
    DSH_HOME: join(root, '.dsh'),
    DSH_PERMISSION_MODE: permissionMode,
    CIPHER_MODE: mode,
  },
  stdio: 'inherit',
});

if (result.error) {
  console.error(`CIPHER CLI: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
