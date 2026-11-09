import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dshBin = join(root, 'node-app', 'node_modules', '@deepseek-ai', 'dsh', 'lib', 'bin.js');
const allowedModes = new Set(['blue-team', 'red-team', 'research-mode']);
const allowedPermissionModes = new Set(['read-only', 'workspace-write']);
const args = process.argv.slice(2);
let mode = 'blue-team';
let permissionMode = 'read-only';

for (let index = 0; index < args.length;) {
  const arg = args[index];
  if (arg === '--mode') {
    const value = args[index + 1];
    if (!value) {
      console.error('vibeX CLI: --mode requires blue-team, red-team, or research-mode.');
      process.exit(2);
    }
    mode = value;
    args.splice(index, 2);
    continue;
  }
  if (arg.startsWith('--mode=')) {
    mode = arg.slice('--mode='.length);
    args.splice(index, 1);
    continue;
  }
  if (arg === '--permission-mode') {
    const value = args[index + 1];
    if (!value) {
      console.error('vibeX CLI: --permission-mode requires read-only or workspace-write.');
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
  console.error(`vibeX CLI: unsupported mode "${mode}". Use blue-team, red-team, or research-mode.`);
  process.exit(2);
}

if (!allowedPermissionModes.has(permissionMode)) {
  console.error(`vibeX CLI: unsupported permission mode "${permissionMode}". Use read-only or workspace-write.`);
  process.exit(2);
}

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`vibeX CLI

Usage: node scripts/launch-cli.mjs [options] <task>

Options:
  --mode <mode>                  blue-team (default), red-team, or research-mode
  --session-id <id>              Continue a previous headless session
  --permission-mode <mode>       read-only (default) or workspace-write
  --json                         Print machine-readable run events
  --add-dir <absolute-path>      Allow an additional workspace directory
  -                              Read the task from standard input
  -h, --help                     Show this help

The CLI runs one task per invocation and has no live approval prompt.`);
  process.exit(0);
}

if (!existsSync(dshBin)) {
  console.error('vibeX CLI: dependencies are missing. Run "npm run setup" from the project root.');
  process.exit(1);
}

const dshArgs = ['--profile', 'headless', ...args];
console.error(`vibeX CLI starting in ${mode} mode (${permissionMode}).`);

const result = spawnSync(process.execPath, [dshBin, ...dshArgs], {
  cwd: root,
  env: {
    ...process.env,
    DSH_HOME: join(root, '.dsh'),
    DSH_PERMISSION_MODE: permissionMode,
    VIBEX_MODE: mode,
  },
  stdio: 'inherit',
});

if (result.error) {
  console.error(`vibeX CLI: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
