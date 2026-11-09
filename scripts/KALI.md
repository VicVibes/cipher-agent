# CIPHER on Kali / Linux

Extract `cipher-agent-github-ready.zip`, then run these commands from the
extracted project directory.

## 1. Install Node.js 24.9 or newer

```bash
node --version
```

If Node.js is missing or older than 24.9, install a current Node 24 release
with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating). Kali's
stock `apt` packages may be too old for the runtime.

```bash
nvm install 24
nvm use 24
node --version
```

## 2. Install and start CIPHER

```bash
chmod +x install.sh scripts/*.sh
./install.sh
```

The installer downloads runtime dependencies on first run and then starts the
GUI. It may take a few minutes on a slow connection.

- The console prints a tokenized link and opens the app window.
- Do **not** open `127.0.0.1:3080` by hand — it shows "authentication required".
- First start can take 2-5 minutes with no output. Leave it alone.
- Only one copy at a time. The launcher stops a stale CIPHER server on port 3080.

Phone on the same Wi-Fi:

```bash
./scripts/cipher-phone.sh
```

The link grants full session access to anyone who has it. Keep it private and
share it only with trusted devices on a trusted network. Open it on the phone,
then select "Add to home screen". If it will not load:

```bash
sudo ufw allow 3080/tcp
```

Admin (only when required for a clearly scoped, authorized local lab):

```bash
./scripts/cipher-admin.sh
```

It asks for your password, then runs the agent as root. Prefer normal
permissions; use this only for an explicitly authorized task on a machine you
own. Admin is also a permission level inside CIPHER and requires approvals.

## 3. Add a model key

In CIPHER: sidebar → **Set up model key**, or **Settings → Models**.

| Provider   | How                                                     |
|------------|---------------------------------------------------------|
| Venice     | Custom model API, base URL `https://api.venice.ai/api/v1` |
| OpenRouter | Third-party provider from the built-in list              |
| Custom AI  | Custom model API with any OpenAI-compatible base URL     |

Keys are write-only in the UI and stored in `.dsh/.credentials.yaml`. Provider
requests may use paid credits; configure provider-side spending limits.

## 4. What is already configured

- Agent presets: **Blue Team** (default), **Red Team**, **Research Mode**.
- Each preset loads its own instruction file and tool set. Red Team is limited
  to local CLI/files; Research Mode adds web research but disables automation
  and delegation. Blue Team keeps defensive workflow tools.
- Shared authorization and safety rules in `AGENTS.md` apply to every preset.
  Edit mode instructions in **Settings → CIPHER → Agent instructions**; shared
  rules are read-only in that editor.

## Troubleshooting

- `EADDRINUSE: 3080` — another instance is running; close it or let the
  launcher clear it.
- Window does not open — install a Chromium browser
  (`sudo apt install -y chromium`) or use the printed link in Firefox.
- Everything is frozen while booting — wait. Boot is silent by design.
