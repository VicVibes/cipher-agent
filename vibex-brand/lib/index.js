// vibeX brand plugin — host half.
//
// The browser half carries the presentation (sidebar mark, wordmark, copy
// scrubber, settings section). This host half serves the shared policy and
// per-preset instruction files edited in Settings.
//
// The file is served over two authenticated routes on the same loopback
// webserver as the UI:
//
//   GET /vibex/agent-instructions?mode=<mode> → instruction file metadata
//   PUT /vibex/agent-instructions?mode=<mode> ← { content } (editable modes only)
//
// Writes are atomic (temp file + rename) and keep a per-file .bak revision.

import { readFile, writeFile, rename, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const ROUTE = "/vibex/agent-instructions";
const MAX_INSTRUCTIONS_BYTES = 64 * 1024;
const MAX_REQUEST_BYTES = 256 * 1024;
const INSTRUCTION_MODES = Object.freeze({
	shared: { file: "AGENTS.md", editable: false },
	"red-team": { file: "VIBEX-RED-TEAM.md", editable: true },
	"blue-team": { file: "VIBEX-BLUE-TEAM.md", editable: true },
	"research-mode": { file: "VIBEX-RESEARCH-MODE.md", editable: true },
});

export const inject = ["webServer"];

/**
 * The instructions file vibeX loads: AGENTS.md beside the profile home
 * (the folder that contains .dsh), falling back to the process working
 * directory when the profile home is not pinned by the launcher.
 */
function instructionsPath() {
	if (process.env.VIBEX_AGENTS_FILE) return resolve(process.env.VIBEX_AGENTS_FILE);
	if (process.env.DSH_HOME) return join(dirname(resolve(process.env.DSH_HOME)), "AGENTS.md");
	return join(process.cwd(), "AGENTS.md");
}

function instructionsPathForMode(mode) {
	const definition = INSTRUCTION_MODES[mode];
	if (definition.file === "AGENTS.md") return instructionsPath();
	return join(dirname(instructionsPath()), definition.file);
}

function connectionOf(ctx) {
	if (typeof ctx.get !== "function") return undefined;
	return ctx.get("connection");
}

/** Reject requests that did not arrive from an authenticated vibeX window. */
function rejectUntrusted(ctx, req, res) {
	const connection = connectionOf(ctx);
	if (connection === undefined || typeof connection.requestRejection !== "function") {
		// Without the connection fence we cannot prove this request came from
		// the owner window, so refuse rather than serve file contents.
		sendJson(res, 503, { error: "vibeX is still starting. Try again in a moment." });
		return true;
	}
	const rejection = connection.requestRejection(req);
	if (rejection === undefined) return false;
	res.statusCode = rejection;
	res.end();
	return true;
}

function sendJson(res, status, payload) {
	res.statusCode = status;
	res.setHeader("content-type", "application/json; charset=utf-8");
	res.setHeader("cache-control", "no-store");
	res.end(JSON.stringify(payload));
}

function sendMethodNotAllowed(res, allow) {
	res.statusCode = 405;
	res.setHeader("allow", allow);
	res.end();
}

async function readBoundedBody(req) {
	const chunks = [];
	let size = 0;
	for await (const chunk of req) {
		size += chunk.byteLength;
		if (size > MAX_REQUEST_BYTES) {
			req.resume();
			return null;
		}
		chunks.push(chunk);
	}
	return Buffer.concat(chunks, size).toString("utf8");
}

function byteLength(text) {
	return Buffer.byteLength(text, "utf8");
}

async function describeFile(file, content, exists) {
	let updatedAt;
	if (exists) {
		try {
			const info = await stat(file);
			updatedAt = info.mtime.toISOString();
		} catch {
			updatedAt = undefined;
		}
	}
	return {
		path: file,
		content,
		bytes: byteLength(content),
		maxBytes: MAX_INSTRUCTIONS_BYTES,
		exists,
		...(updatedAt === undefined ? {} : { updatedAt }),
	};
}

async function readInstructions(file) {
	try {
		const content = await readFile(file, "utf8");
		return describeFile(file, content, true);
	} catch (error) {
		if (error && error.code === "ENOENT") return describeFile(file, "", false);
		throw error;
	}
}

async function writeInstructions(file, content) {
	const previous = await readInstructions(file);
	if (previous.exists) {
		await writeFile(`${file}.bak`, previous.content, "utf8");
	}
	const temp = `${file}.vibex-${process.pid}.tmp`;
	await writeFile(temp, content, "utf8");
	await rename(temp, file);
	return describeFile(file, content, true);
}

function messagesFor(error) {
	const detail = error && typeof error.message === "string" ? error.message : String(error);
	if (error && error.code === "ENOENT") return "The instructions folder does not exist yet.";
	if (error && error.code === "EACCES") return "vibeX is not allowed to write that file.";
	return `vibeX could not save the instructions: ${detail}`;
}

export function apply(ctx) {
	const route = {
		kind: "exact",
		path: ROUTE,
		handler: async (req, res) => {
			if (rejectUntrusted(ctx, req, res)) return;
			const url = new URL(req.url || "/", "http://localhost");
			const mode = url.searchParams.get("mode") || "shared";
			if (!Object.prototype.hasOwnProperty.call(INSTRUCTION_MODES, mode)) {
				sendJson(res, 400, { error: "Unknown instruction mode." });
				return;
			}
			const definition = INSTRUCTION_MODES[mode];
			const file = instructionsPathForMode(mode);

			if (req.method === "GET") {
				try {
					sendJson(res, 200, {
						...await readInstructions(file),
						mode,
						editable: definition.editable,
					});
				} catch (error) {
					sendJson(res, 500, { error: messagesFor(error) });
				}
				return;
			}

			if (req.method !== "PUT") {
				sendMethodNotAllowed(res, "GET, PUT");
				return;
			}

			if (!definition.editable) {
				sendJson(res, 403, { error: "Shared safety instructions are read-only in Settings." });
				return;
			}

			const contentType = String(req.headers["content-type"] || "").split(";", 1)[0].trim().toLowerCase();
			if (contentType !== "application/json") {
				sendJson(res, 415, { error: "Send application/json." });
				return;
			}

			const text = await readBoundedBody(req);
			if (text === null) {
				sendJson(res, 413, { error: "The instructions are too large to send." });
				return;
			}

			let body;
			try {
				body = JSON.parse(text);
			} catch {
				sendJson(res, 400, { error: "The request body is not valid JSON." });
				return;
			}
			if (typeof body !== "object" || body === null || typeof body.content !== "string") {
				sendJson(res, 400, { error: "Expected { content: string }." });
				return;
			}
			if (byteLength(body.content) > MAX_INSTRUCTIONS_BYTES) {
				sendJson(res, 413, {
					error: `The instructions are over ${Math.round(MAX_INSTRUCTIONS_BYTES / 1024)} KB. Trim them and save again.`,
				});
				return;
			}

			try {
				const saved = await writeInstructions(file, body.content);
				if (ctx.logger !== undefined) ctx.logger.info(`vibex-brand: saved ${mode} instructions (${saved.bytes} bytes)`);
				sendJson(res, 200, { ...saved, mode, editable: true });
			} catch (error) {
				sendJson(res, 500, { error: messagesFor(error) });
			}
		},
	};

	ctx.effect(() => ctx.webServer.register(route), "vibex-brand: agent instructions route");
}
