window.__ModuleLoader__.load({
	id: "cipher-brand",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		var react = require("react");
		var reactDom = require("react-dom");
		var h = react.createElement;
		var useState = react.useState;
		var useEffect = react.useEffect;

		var CSS_ID = "cipher-brand-styles";
		var CIPHER_ICON_DATA = "data:image/svg+xml," + encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.6 20.4 7.3v9.4L12 21.4 3.6 16.7V7.3L12 2.6Z" fill="none" stroke="#22d3ee" stroke-width="1.3" stroke-linejoin="round"/><path d="M15.4 9.2a4.1 4.1 0 1 0 0 5.6" fill="none" stroke="#e6f9ff" stroke-width="1.7" stroke-linecap="round"/></svg>'
		);
		var CSS = [
			// Cyber typography: Cascadia Code ships on Windows 11; Kali falls back
			// through JetBrains Mono / DejaVu Sans Mono.
			":root{--dsh-font-family-text-default:'Cascadia Code','JetBrains Mono','Fira Code',Consolas,'DejaVu Sans Mono','Liberation Mono',monospace;--dsh-font-family-text:var(--dsh-font-family-text-default);--dsw-font-family:var(--dsh-font-family-text-default);--dsw-font-family-brand:'Cascadia Code','JetBrains Mono','Fira Code',Consolas,monospace}",
			"body,button,input,textarea,select{font-family:var(--dsh-font-family-text-default)}",
			"[data-chat-running]{--dsw-alias-label-deep-diving:#22d3ee;--dsw-alias-label-deep-diving-shimmer:#67e8f9;color:#22d3ee}",
			"[data-chat-running] span[aria-hidden='true']:has(svg){display:inline-flex!important;align-items:center;justify-content:center}",
			"[data-chat-running] span[aria-hidden='true']:has(svg)>*{display:none!important}",
			"[data-chat-running] span[aria-hidden='true']:has(svg)::before{content:'C';box-sizing:border-box;width:14px;height:14px;border:1px solid currentColor;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;line-height:1}",
			"[class*='_brandMark']:not(:has([data-cipher-brand-mark]))>svg,[class*='_railMark']:not(:has([data-cipher-brand-mark]))>svg,[class*='_fishHitbox']:not(:has([data-cipher-brand-mark]))>svg{display:none!important}",
			"[class*='_brandMark']:not(:has([data-cipher-brand-mark]))::after,[class*='_railMark']:not(:has([data-cipher-brand-mark]))::after,[class*='_fishHitbox']:not(:has([data-cipher-brand-mark]))::after{content:'C';box-sizing:border-box;width:24px;height:24px;border:1px solid #22d3ee;border-radius:7px;color:#22d3ee;display:inline-flex;align-items:center;justify-content:center;font:700 12px/1 ui-monospace,Consolas,monospace}",
			".cipher-brand-name{font-family:var(--ds-font-family-code,ui-monospace,SFMono-Regular,Consolas,monospace);font-size:15px;font-weight:700;letter-spacing:.18em;white-space:nowrap}",
			".cipher-setup{display:flex;align-items:center;gap:7px;width:100%;min-width:0;min-height:32px;margin:0 0 2px;padding:6px 10px;border:0;border-radius:var(--dsw-radius-md,8px);background:transparent;color:var(--dsw-alias-label-secondary,inherit);font:inherit;font-size:13px;line-height:20px;text-align:left;cursor:pointer}",
			".cipher-setup:hover{background-color:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.12))}",
			".cipher-setup-rail{justify-content:center;width:32px;height:32px;padding:0;margin:0 auto 2px}",
			".cipher-setup-glyph{flex:none;display:inline-flex;align-items:center;justify-content:center;color:#22d3ee}",
			".cipher-overlay{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:24px}",
			".cipher-card{width:min(580px,100%);max-height:calc(100vh - 48px);overflow:auto;border-radius:14px;background:var(--dsw-alias-bg-modal,#16181d);color:var(--dsw-alias-label-primary,#e8eaed);box-shadow:0 24px 64px rgba(0,0,0,.5);border:1px solid rgba(127,127,127,.28);padding:22px 24px;font-size:14px;line-height:1.55}",
			".cipher-card h2{margin:0 0 2px;font-size:18px;letter-spacing:.02em}",
			".cipher-card p{margin:8px 0}",
			".cipher-card ol{margin:10px 0 6px;padding-left:20px}",
			".cipher-card li{margin:4px 0}",
			".cipher-kv{display:grid;grid-template-columns:118px 1fr;gap:6px 12px;margin:12px 0;font-size:13px}",
			".cipher-card code{font-family:ui-monospace,Consolas,monospace;font-size:12.5px;background:rgba(127,127,127,.16);padding:1px 5px;border-radius:4px;word-break:break-all}",
			".cipher-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:18px}",
			".cipher-btn{border:1px solid rgba(127,127,127,.35);border-radius:8px;background:transparent;color:inherit;font:inherit;font-size:13px;padding:8px 14px;cursor:pointer}",
			".cipher-btn:hover{background:rgba(127,127,127,.14)}",
			".cipher-btn-primary{background:#22d3ee;border-color:#22d3ee;color:#06121a;font-weight:600}",
			".cipher-btn-primary:hover{background:#67e8f9}",
			".cipher-hint{margin:0;font-size:12.5px;opacity:.75}",
			".cipher-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:14px 0 10px}",
			".cipher-tab{border:1px solid rgba(127,127,127,.35);border-radius:999px;background:transparent;color:inherit;font:inherit;font-size:12.5px;padding:5px 12px;cursor:pointer}",
			".cipher-tab:hover{background:rgba(127,127,127,.14)}",
			".cipher-tab[aria-pressed='true']{border-color:#22d3ee;color:#22d3ee;background:rgba(34,211,238,.1)}",
			".cipher-provider{border:1px solid rgba(127,127,127,.22);border-radius:10px;padding:10px 13px;margin:0 0 8px}",
			".cipher-provider h3{margin:0 0 4px;font-size:14px;letter-spacing:.02em}",
			".cipher-provider p{margin:4px 0}",
			".cipher-settings{max-width:640px;padding:4px 2px;font-size:13.5px;line-height:1.55}",
			".cipher-settings h2{margin:0 0 6px;font-size:16px}",
			".cipher-settings h3{margin:18px 0 4px;font-size:13.5px;letter-spacing:.04em;text-transform:uppercase;opacity:.8}",
			".cipher-settings p{margin:4px 0}",
			".cipher-pill{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:999px;background:rgba(34,211,238,.14);color:#22d3ee;font-size:11px;letter-spacing:.06em;text-transform:uppercase}",
			".cipher-settings .cipher-btn{margin-top:8px}",
			".cipher-field{display:flex;flex-direction:column;gap:5px;margin:12px 0 0}",
			".cipher-label{font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;opacity:.7}",
			".cipher-input{box-sizing:border-box;width:100%;height:34px;padding:0 10px;border:1px solid rgba(127,127,127,.4);border-radius:8px;background:rgba(127,127,127,.08);color:inherit;font:inherit;font-size:13px}",
			".cipher-input:focus{outline:none;border-color:#22d3ee;box-shadow:0 0 0 2px rgba(34,211,238,.18)}",
			".cipher-input::placeholder{opacity:.45}",
			"select.cipher-input{cursor:pointer}",
			".cipher-key-row{display:flex;gap:8px;align-items:center}",
			".cipher-key-row .cipher-input{flex:1;min-width:0}",
			".cipher-toggle{border:1px solid rgba(127,127,127,.4);border-radius:8px;background:transparent;color:inherit;font:inherit;font-size:12px;height:34px;padding:0 10px;cursor:pointer}",
			".cipher-toggle:hover{background:rgba(127,127,127,.14)}",
			".cipher-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
			".cipher-field-head{display:flex;align-items:center;justify-content:space-between;gap:10px}",
			".cipher-field-actions{display:inline-flex;align-items:center;gap:10px;flex:none}",
			".cipher-link{border:0;background:transparent;color:#22d3ee;font:inherit;font-size:12px;padding:2px 0;cursor:pointer}",
			".cipher-link:hover{text-decoration:underline}",
			".cipher-link:disabled{opacity:.5;cursor:default;text-decoration:none}",
			".cipher-error{margin:10px 0 0;color:#f87171;font-size:12.5px}",
			".cipher-ok{margin:10px 0 2px;color:#34d399;font-size:13px;font-weight:600}",
			".cipher-editor{box-sizing:border-box;width:100%;min-height:300px;margin:8px 0 0;padding:12px 14px;border:1px solid rgba(127,127,127,.4);border-radius:10px;background:rgba(0,0,0,.22);color:inherit;font-family:'Cascadia Code','JetBrains Mono','Fira Code',Consolas,monospace;font-size:12.5px;line-height:1.6;resize:vertical;tab-size:2}",
			".cipher-editor:focus{outline:none;border-color:#22d3ee;box-shadow:0 0 0 2px rgba(34,211,238,.18)}",
			".cipher-meta{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;margin:6px 0 0;font-size:12px;opacity:.72}",
			".cipher-meta code{font-size:11.5px}",
			".cipher-editor-actions{display:flex;gap:10px;align-items:center;margin-top:10px}",
			".cipher-dirty{margin-left:auto;color:#fbbf24;font-size:12px}",
			".cipher-success{padding:2px 0 0}",
			".cipher-btn:disabled,.cipher-tab:disabled{opacity:.5;cursor:default}",
		].join("\n");

		function installStyles() {
			if (typeof document === "undefined") return;
			var style = document.getElementById(CSS_ID);
			if (style) {
				if (style.textContent !== CSS) style.textContent = CSS;
				return;
			}
			style = document.createElement("style");
			style.id = CSS_ID;
			style.textContent = CSS;
			document.head.appendChild(style);
		}

		function ownTitle() {
			if (typeof document === "undefined") return;
			if (document.title !== "CIPHER") document.title = "CIPHER";
			var icons = document.querySelectorAll('link[rel~="icon"]');
			for (var index = 0; index < icons.length; index++) {
				var icon = icons[index];
				if (icon.getAttribute("href") !== CIPHER_ICON_DATA) icon.setAttribute("href", CIPHER_ICON_DATA);
				if (icon.getAttribute("type") !== "image/svg+xml") icon.setAttribute("type", "image/svg+xml");
			}
		}

		// Visible UI copy only: boot/loading, live status, dialogs, menus, and navigation.
		// Conversation transcript, session titles, and editable fields are left
		// untouched so user content is never rewritten.
		var SCRUB_ROOTS = '[role="dialog"],[role="menu"],[data-shortcut-modal],[role="navigation"],[role="status"],[aria-live="polite"],[data-dsh-boot]';
		var SCRUB_SKIP = '[role="tree"],[contenteditable="true"],[role="textbox"],textarea,input,select';
		var BRAND_PHRASES = [
			["Sign in to your DeepSeek account or add an API Key to get started. Your projects and files are stored locally.", "Add a model provider key to get started. Your projects and files are stored locally."],
			["Sign in to your DeepSeek account or add an API Key to get started.", "Add a model provider key to get started."],
			["Model unavailable. Please sign in and try again.", "Model unavailable. Check your model provider configuration and try again."],
			["Env var not detected. Enter an API key, or configure DEEPSEEK_API_KEY in your env.", "Enter an API key for this provider, or set it in the server environment."],
			["deepseek-official", "cipher-default"],
			["Configure the official DeepSeek provider to start building.", "Add an OpenAI-compatible model provider to start building."],
			["DeepSeek Harness", "CIPHER"],
			["restart Harness", "restart CIPHER"],
			["Restart Harness", "Restart CIPHER"],
			["restart the Harness", "restart CIPHER"],
			["upgrade Harness", "upgrade CIPHER"],
			["Upgrade Harness", "Upgrade CIPHER"],
			["DeepSeek Account", "CIPHER Account"],
			["DeepSeek account", "CIPHER account"],
			["Connected to DeepSeek", "Connected to CIPHER"],
			["Sign in to DeepSeek", "Sign in to CIPHER"],
			["official DeepSeek provider", "a model provider"],
			["Help improve DeepSeek models and products.", "Help improve CIPHER."],
			["using the official model API", "using a model API"],
		];

		function scrubValue(text) {
			var next = text;
			for (var index = 0; index < BRAND_PHRASES.length; index++) {
				var phrase = BRAND_PHRASES[index][0];
				if (next.indexOf(phrase) !== -1) next = next.split(phrase).join(BRAND_PHRASES[index][1]);
			}
			next = next.replace(/\bDeepSeek(?:\s+Harness)?\b/gi, "CIPHER").replace(/\bHarness\b/gi, "CIPHER");
			return next;
		}

		function scrubAllowed(node) {
			if (!node || typeof document === "undefined") return false;
			var element = node.nodeType === 1 ? node : node.parentElement;
			if (!element || !element.closest) return false;
			if (element.closest(SCRUB_SKIP)) return false;
			return !!element.closest(SCRUB_ROOTS);
		}

		function scrubTextNode(node) {
			var text = node.nodeValue;
			if (!text || !/deepseek|harness/i.test(text)) return;
			if (!scrubAllowed(node)) return;
			var next = scrubValue(text);
			if (next !== text) node.nodeValue = next;
		}

		function scrubRunningStatus(root) {
			if (!root || typeof document === "undefined") return;
			var element = root.nodeType === 1 ? root : root.parentElement;
			if (!element) return;
			var statuses = [];
			if (element.matches && element.matches("[data-chat-running]")) statuses.push(element);
			var owner = element.closest && element.closest("[data-chat-running]");
			if (owner && statuses.indexOf(owner) === -1) statuses.push(owner);
			if (root.nodeType === 1 && root.querySelectorAll) {
				statuses = statuses.concat(Array.prototype.slice.call(root.querySelectorAll("[data-chat-running]")));
			}
			for (var statusIndex = 0; statusIndex < statuses.length; statusIndex++) {
				var walker = document.createTreeWalker(statuses[statusIndex], NodeFilter.SHOW_TEXT, null);
				var node;
				while ((node = walker.nextNode())) {
					var text = node.nodeValue;
					if (!text || !/^Deep diving(?= for |$)/.test(text)) continue;
					node.nodeValue = text.replace(/^Deep diving(?= for |$)/, "CIPHER is thinking");
				}
			}
		}

		function scrubAttributes(root) {
			var nodes = root.querySelectorAll("[aria-label],[title],[alt]");
			for (var index = 0; index < nodes.length; index++) {
				var node = nodes[index];
				if (!scrubAllowed(node)) continue;
				["aria-label", "title", "alt"].forEach(function (name) {
					var value = node.getAttribute(name);
					if (!value || !/deepseek|harness/i.test(value)) return;
					var next = scrubValue(value);
					if (next !== value) node.setAttribute(name, next);
				});
			}
		}

		function scrubTree(root) {
			if (!root) return;
			if (root.nodeType === 3) {
				scrubTextNode(root);
				scrubRunningStatus(root);
				return;
			}
			if (root.nodeType !== 1) return;
			if (/^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT)$/.test(root.tagName)) return;
			// Walk the whole added subtree: a late-mounted wrapper can contain the
			// dialog/menu we care about even when the wrapper itself is not a root.
			// scrubTextNode filters each node, so chat text stays untouched.
			var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
			var node;
			while ((node = walker.nextNode())) scrubTextNode(node);
			scrubAttributes(root);
			scrubRunningStatus(root);
		}

		// CIPHER uses provider API keys, not a DeepSeek account. Hide the stock
		// account prompt before its branding or sign-in controls can be shown.
		function hideNativeOnboarding() {
			if (typeof document === "undefined") return;
			var dialogs = document.querySelectorAll('[role="dialog"],dialog');
			for (var index = 0; index < dialogs.length; index++) {
				var dialog = dialogs[index];
				if (dialog.getAttribute("data-cipher-hidden") === "account") continue;
				var text = (dialog.textContent || "").replace(/\s+/g, " ");
				var stockBrand = /\bDeepSeek(?:\s+Harness)?\b/i.test(text);
				var rewrittenAccountPrompt = /\bCIPHER(?:\s+Harness)?\b/i.test(text) &&
					/\b(?:sign[\s-]?in|log[\s-]?in|welcome to|get started)\b/i.test(text);
				if (!stockBrand && !rewrittenAccountPrompt) continue;
				if (!/\b(?:sign[\s-]?in|log[\s-]?in|account|API\s*key|welcome to|get started)\b/i.test(text)) continue;
				var wrapper = dialog.closest('[role="presentation"]') || dialog;
				wrapper.setAttribute("data-cipher-hidden", "account");
				wrapper.style.setProperty("display", "none", "important");
			}
		}

		function hideNativeAccountPrompts() {
			if (typeof document === "undefined") return;
			var trigger = document.querySelector('button[aria-label="Account menu"][aria-expanded="true"]');
			if (!trigger) return;
			var menus = document.querySelectorAll('[role="menu"]');
			for (var menuIndex = 0; menuIndex < menus.length; menuIndex++) {
				var items = menus[menuIndex].querySelectorAll('[role="menuitem"],button,a');
				for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
					var item = items[itemIndex];
					var label = (item.getAttribute("aria-label") || item.textContent || "").replace(/\s+/g, " ").trim();
					if (!/^sign in(?: again)?$/i.test(label)) continue;
					item.style.setProperty("display", "none", "important");
				}
			}
		}

		function startScrubber() {
			if (typeof document === "undefined" || typeof MutationObserver === "undefined") return null;
			hideNativeOnboarding();
			hideNativeAccountPrompts();
			scrubTree(document.body);
			var roots = document.querySelectorAll(SCRUB_ROOTS);
			for (var index = 0; index < roots.length; index++) scrubTree(roots[index]);
			var observer = new MutationObserver(function (records) {
				hideNativeOnboarding();
				hideNativeAccountPrompts();
				for (var recordIndex = 0; recordIndex < records.length; recordIndex++) {
					var record = records[recordIndex];
					if (record.type === "attributes") continue;
					if (record.type === "characterData") {
						scrubTextNode(record.target);
						scrubRunningStatus(record.target);
						continue;
					}
					for (var addIndex = 0; addIndex < record.addedNodes.length; addIndex++) scrubTree(record.addedNodes[addIndex]);
				}
			});
			observer.observe(document.body, {
				childList: true,
				subtree: true,
				characterData: true,
				attributes: true,
				attributeFilter: ["aria-expanded"],
			});
			return observer;
		}

		function CipherMark(props) {
			var size = props && props.size ? props.size : 24;
			return h(
				"svg",
				{
					width: size,
					height: size,
					viewBox: "0 0 24 24",
					fill: "none",
					className: props && props.className ? props.className : undefined,
					"data-cipher-brand-mark": "true",
					"aria-hidden": "true",
					focusable: "false",
				},
				h("path", {
					d: "M12 2.6 20.4 7.3v9.4L12 21.4 3.6 16.7V7.3L12 2.6Z",
					stroke: "currentColor",
					strokeWidth: 1.3,
					strokeLinejoin: "round",
				}),
				h("path", {
					d: "M15.4 9.2a4.1 4.1 0 1 0 0 5.6",
					stroke: "#22d3ee",
					strokeWidth: 1.7,
					strokeLinecap: "round",
				})
			);
		}

		function CipherName() {
			return h("span", { className: "cipher-brand-name" }, "CIPHER");
		}

		function HeroMark(props) {
			return h(CipherMark, {
				size: props && props.size ? props.size : 34,
				className: props && props.className ? props.className : undefined,
			});
		}

		function findByText(scope, selector, text) {
			var nodes = Array.prototype.slice.call(scope.querySelectorAll(selector));
			for (var index = 0; index < nodes.length; index++) {
				var node = nodes[index];
				var label = (node.getAttribute("aria-label") || "").trim();
				var body = (node.textContent || "").trim();
				if (label === text || body === text || body.indexOf(text) === 0) return node;
			}
			return null;
		}

		function openSettingsSection(sectionName) {
			if (typeof document === "undefined") return false;
			var launcher =
				document.querySelector('button[aria-label="Account menu"]') ||
				document.querySelector('button[aria-haspopup="dialog"]');
			if (!launcher) return false;
			launcher.click();
			window.setTimeout(function () {
				var item =
					findByText(document, '[role="menuitem"]', "Settings") ||
					findByText(document, '[role="menu"] button', "Settings");
				if (!item) return;
				item.click();
				window.setTimeout(function () {
					var board = document.querySelector('[data-shortcut-modal="settings"]');
					var scope = (board && board.querySelector("nav")) || document;
					var target = findByText(scope, "button", sectionName);
					if (target) target.click();
				}, 350);
			}, 250);
			return true;
		}

		function openSettingsModels() {
			return openSettingsSection("Models");
		}

		// Model setup runs in the card itself: the profile write, the key write,
		// and the new-session default all go through the same local APIs the
		// Models settings page uses. Nothing is logged and nothing leaves the box.
		var PROTOCOL_CHOICES = [
			["openai-completions", "OpenAI Chat Completions"],
			["openai-responses", "OpenAI Responses"],
			["anthropic-messages", "Anthropic Messages"],
		];

		var MODEL_OPTIONS = [
			{
				id: "venice",
				label: "Venice",
				hint: "Private, OpenAI-compatible",
				route: "venice",
				baseURL: "https://api.venice.ai/api/v1",
				api: "openai-completions",
				displayName: "Venice",
				modelPlaceholder: "venice-uncensored",
				modelHint: "Exact model id from your Venice dashboard. The key is sent only to api.venice.ai.",
			},
			{
				id: "openrouter",
				label: "OpenRouter",
				hint: "One key, many models",
				route: "openrouter",
				baseURL: "https://openrouter.ai/api/v1",
				api: "openai-completions",
				displayName: "OpenRouter",
				modelPlaceholder: "openrouter/auto",
				modelHint: "Any route id, for example openrouter/auto or anthropic/claude-sonnet-4.5.",
			},
			{
				id: "custom",
				label: "Custom AI",
				hint: "Your own endpoint",
				route: "",
				baseURL: "",
				api: "openai-completions",
				displayName: "",
				modelPlaceholder: "model-id",
				modelHint: "The model id your endpoint serves. Works with relays, Ollama, vLLM, and compatible gateways.",
			},
		];

		function rpcId() {
			try {
				return window.crypto.randomUUID();
			} catch (error) {
				return "cipher-" + Date.now() + "-" + Math.random().toString(16).slice(2);
			}
		}

		function apiCall(method, args) {
			return window
				.fetch("/api/" + method, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						type: "client-request",
						rpcId: rpcId(),
						method: method,
						payload: { args: args || {} },
					}),
				})
				.then(function (response) {
					if (!response.ok) throw new Error("CIPHER server returned HTTP " + response.status + ".");
					return response.json();
				})
				.then(function (message) {
					if (!message || !message.result) throw new Error("CIPHER did not answer. Try again.");
					if (!message.result.ok) {
						var detail = message.result.error || {};
						var failure = new Error(detail.message || "CIPHER refused the request.");
						failure.code = detail.code;
						throw failure;
					}
					return message.result.value;
				});
		}

		function namespaceView(description, name) {
			var list = (description && description.namespaces) || [];
			for (var index = 0; index < list.length; index++) {
				if (list[index].ns === name) return list[index];
			}
			return null;
		}

		function apiKeyRef(route) {
			return route.toUpperCase().replace(/[^A-Z0-9]+/g, "_") + "_API_KEY";
		}

		function mutateWithRetry(namespace, operations) {
			function attempt(left) {
				return apiCall("settings/describe", {}).then(function (description) {
					var view = namespaceView(description, namespace);
					var request = {
						ns: namespace,
						ops: operations,
						expectedRevision: view ? view.revision : 0,
					};
					return apiCall("settings/mutate", request).catch(function (error) {
						if (left > 0 && error.code === "settings/conflict") return attempt(left - 1);
						throw error;
					});
				});
			}
			return attempt(1);
		}

		function setDefaultModel(route, modelId) {
			return mutateWithRetry("agent-default-model", [
				{ op: "set", path: [], value: { provider: route, model: modelId } },
			]);
		}

		function SetupCard(props) {
			var onClose = props.onClose;
			var selectedTab = useState("venice");
			var active = selectedTab[0];
			var option = MODEL_OPTIONS[0];
			for (var optionIndex = 0; optionIndex < MODEL_OPTIONS.length; optionIndex++) {
				if (MODEL_OPTIONS[optionIndex].id === active) option = MODEL_OPTIONS[optionIndex];
			}

			var keyState = useState("");
			var modelState = useState("");
			var routeState = useState("");
			var baseState = useState("");
			var apiState = useState("openai-completions");
			var nameState = useState("");
			var showState = useState(false);
			var busyState = useState(false);
			var failureState = useState("");
			var connectedState = useState(null);
			var candidatesState = useState([]);
			var manualState = useState(false);
			var fetchingState = useState(false);

			var apiKey = keyState[0];
			var modelId = modelState[0];
			var customRoute = routeState[0];
			var customBase = baseState[0];
			var customApi = apiState[0];
			var customName = nameState[0];
			var busy = busyState[0];
			var failure = failureState[0];
			var connected = connectedState[0];
			var candidates = candidatesState[0];
			var manual = manualState[0];
			var fetching = fetchingState[0];

			function switchTab(id) {
				selectedTab[1](id);
				keyState[1]("");
				modelState[1]("");
				failureState[1]("");
				connectedState[1](null);
				candidatesState[1]([]);
				manualState[1](false);
			}

			function fetchModels() {
				if (fetching || busy) return;
				failureState[1]("");
				var isCustom = active === "custom";
				var route = (isCustom ? customRoute : option.route).trim();
				var baseURL = (isCustom ? customBase : option.baseURL).trim();
				var api = isCustom ? customApi : option.api;
				var keyValue = apiKey.trim();
				if (!/^https?:\/\/[^\s]+$/.test(baseURL)) {
					failureState[1]("Set the base URL first: it must start with http:// or https://.");
					return;
				}
				if (keyValue && !/^[\x21-\x7E]+$/.test(keyValue)) {
					failureState[1]("The API key has characters the provider will reject. Paste the key itself.");
					return;
				}
				var request = { provider: route, baseURL: baseURL, api: api };
				if (keyValue) request.apiKey = keyValue;
				fetchingState[1](true);
				apiCall("llm/discoverModels", { settingsNs: "llm-pi-ai", request: request })
					.then(function (found) {
						var seen = {};
						var unique = [];
						(found || []).forEach(function (model) {
							if (!model || typeof model.id !== "string" || !model.id || seen[model.id]) return;
							seen[model.id] = true;
							unique.push(model);
						});
						if (unique.length === 0) throw new Error("The endpoint returned no models. Type the id by hand.");
						candidatesState[1](unique);
						manualState[1](false);
						if (unique.length === 1) modelState[1](unique[0].id);
					})
					.catch(function (error) {
						failureState[1](String((error && error.message) || error));
					})
					.then(function () {
						fetchingState[1](false);
					});
			}

			function connect() {
				if (busy) return;
				failureState[1]("");
				connectedState[1](null);

				var isCustom = active === "custom";
				var route = (isCustom ? customRoute : option.route).trim();
				var baseURL = (isCustom ? customBase : option.baseURL).trim();
				var api = isCustom ? customApi : option.api;
				var displayName = (isCustom ? customName : option.displayName).trim();
				var keyValue = apiKey.trim();
				var modelValue = modelId.trim();

				if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(route)) {
					failureState[1]('Provider id must be lowercase letters, digits, and hyphens, starting with a letter (for example "local-ai").');
					return;
				}
				if (!/^https?:\/\/[^\s]+$/.test(baseURL)) {
					failureState[1]("Base URL must start with http:// or https://.");
					return;
				}
				if (keyValue) {
					if (!/^[\x21-\x7E]+$/.test(keyValue)) {
						failureState[1]("Paste the API key itself: printable characters, no spaces or line breaks.");
						return;
					}
				} else if (!isCustom) {
					failureState[1]("Paste your API key.");
					return;
				}
				if (!/^\S+$/.test(modelValue)) {
					failureState[1]("Enter the exact model id with no spaces.");
					return;
				}

				busyState[1](true);
				var profile = { api: api, baseURL: baseURL, models: [{ id: modelValue }] };
				if (displayName) profile.displayName = displayName;
				if (keyValue) profile.apiKeyEnv = apiKeyRef(route);

				var ready = Promise.resolve();
				if (isCustom) {
					ready = apiCall("llm/listConfigurableProviders", {}).then(function (list) {
						var taken = (list || []).some(function (entry) { return entry.provider === route; });
						if (taken) throw new Error('Provider id "' + route + '" is already in use. Choose another.');
					});
				}

				ready
					.then(function () {
						return mutateWithRetry("llm-pi-ai", [
							{ op: "set", path: ["providers", route], value: profile },
						]);
					})
					.then(function () {
						if (!keyValue) return void 0;
						return apiCall("credentials/set", { ref: profile.apiKeyEnv, value: keyValue });
					})
					.then(function () {
						return setDefaultModel(route, modelValue);
					})
					.then(function () {
						keyState[1]("");
						connectedState[1]({
							name: displayName || route,
							model: modelValue,
						});
					})
					.catch(function (error) {
						var message = String((error && error.message) || error);
						if (error && error.code === "settings/rejected" && /writer lock/i.test(message)) {
							message = "Another settings write is in progress. Wait a moment and try again.";
						} else if (error && error.code === "settings/rejected") {
							message = "CIPHER refused the settings write: " + message;
						}
						failureState[1](message);
					})
					.then(function () {
						busyState[1](false);
					});
			}

			return reactDom.createPortal(
				h(
					"div",
					{
						className: "cipher-overlay",
						role: "presentation",
						onMouseDown: function (event) {
							if (event.target === event.currentTarget) onClose();
						},
					},
					h(
						"div",
						{
							className: "cipher-card",
							role: "dialog",
							"aria-modal": "true",
							"aria-label": "Connect a model to CIPHER",
							onKeyDown: function (event) {
								if (event.key === "Enter" && event.target && event.target.tagName === "INPUT") {
									event.preventDefault();
									connect();
								}
							},
						},
						h("h2", null, "Connect a model to CIPHER"),
						h(
							"p",
							null,
							connected
								? "Saved. New sessions start on this model."
								: "Enter the key here. CIPHER stores it locally and makes it the default for new sessions."
						),
						connected
							? h(
									"div",
									{ className: "cipher-success" },
									h("p", { className: "cipher-ok" }, "Connected to " + connected.name + " · " + connected.model + "."),
									h("p", { className: "cipher-hint" }, "The key is stored in .dsh/.credentials.yaml on this machine."),
									h(
										"div",
										{ className: "cipher-actions" },
										h(
											"button",
											{
												type: "button",
												className: "cipher-btn cipher-btn-primary",
												onClick: function () {
													onClose();
													window.setTimeout(function () { window.location.reload(); }, 150);
												},
											},
											"Start using it"
										)
									)
								)
							: [
									h(
										"div",
										{ className: "cipher-tabs", role: "tablist", "aria-label": "Model providers" },
										MODEL_OPTIONS.map(function (entry) {
											return h(
												"button",
												{
													key: entry.id,
													type: "button",
													role: "tab",
													className: "cipher-tab",
													"aria-pressed": entry.id === active ? "true" : "false",
													disabled: busy,
													onClick: function () { switchTab(entry.id); },
												},
												entry.label
											);
										})
									),
									h(
										"div",
										{ className: "cipher-provider", role: "tabpanel" },
										h("h3", null, option.label, h("span", { className: "cipher-pill" }, option.hint)),
										active === "custom"
											? h(
													"div",
													{ className: "cipher-row2" },
													h(
														"label",
														{ className: "cipher-field" },
														h("span", { className: "cipher-label" }, "Provider id"),
														h("input", {
															className: "cipher-input",
															type: "text",
															value: customRoute,
															placeholder: "local-ai",
															spellCheck: false,
															autoComplete: "off",
															onChange: function (event) { routeState[1](event.target.value); },
														})
													),
													h(
														"label",
														{ className: "cipher-field" },
														h("span", { className: "cipher-label" }, "Protocol"),
														h(
															"select",
															{
																className: "cipher-input",
																value: customApi,
																onChange: function (event) { apiState[1](event.target.value); },
															},
															PROTOCOL_CHOICES.map(function (choice) {
																return h("option", { key: choice[0], value: choice[0] }, choice[1]);
															})
														)
													)
												)
											: null,
										active === "custom"
											? h(
													"label",
													{ className: "cipher-field" },
													h("span", { className: "cipher-label" }, "Base URL"),
													h("input", {
														className: "cipher-input",
														type: "text",
														value: customBase,
														placeholder: "https://example.com/v1",
														spellCheck: false,
														autoComplete: "off",
														onChange: function (event) { baseState[1](event.target.value); },
													})
												)
											: h(
													"p",
													{ className: "cipher-hint" },
													"Endpoint: ",
													h("code", null, option.baseURL)
												),
										active === "custom"
											? h(
													"label",
													{ className: "cipher-field" },
													h("span", { className: "cipher-label" }, "Display name (optional)"),
													h("input", {
														className: "cipher-input",
														type: "text",
														value: customName,
														placeholder: "Local AI",
														autoComplete: "off",
														onChange: function (event) { nameState[1](event.target.value); },
													})
												)
											: null,
										h(
											"label",
											{ className: "cipher-field" },
											h("span", { className: "cipher-label" }, active === "custom" ? "API key (optional)" : "API key"),
											h(
												"div",
												{ className: "cipher-key-row" },
												h("input", {
													className: "cipher-input",
													type: showState[0] ? "text" : "password",
													value: apiKey,
													placeholder: active === "openrouter" ? "sk-or-v1-..." : "paste your key",
													spellCheck: false,
													autoComplete: "off",
													onChange: function (event) { keyState[1](event.target.value); },
												}),
												h(
													"button",
													{
														type: "button",
														className: "cipher-toggle",
														onClick: function () { showState[1](!showState[0]); },
													},
													showState[0] ? "Hide" : "Show"
												)
											)
										),
										h(
											"div",
											{ className: "cipher-field" },
											h(
												"div",
												{ className: "cipher-field-head" },
												h("span", { className: "cipher-label" }, "Model id"),
												h(
													"span",
													{ className: "cipher-field-actions" },
													candidates.length > 0
														? h(
																"button",
																{
																	type: "button",
																	className: "cipher-link",
																	onClick: function () { manualState[1](!manualState[0]); },
																},
																manual ? "Use list" : "Type manually"
															)
														: null,
													h(
														"button",
														{
															type: "button",
															className: "cipher-link",
															disabled: fetching || busy,
															onClick: fetchModels,
														},
														fetching ? "Fetching..." : candidates.length > 0 ? "Refresh" : "Fetch models"
													)
												)
											),
											candidates.length > 0 && !manual
												? h(
														"select",
														{
															className: "cipher-input",
															value: modelId,
															onChange: function (event) { modelState[1](event.target.value); },
														},
														h("option", { value: "" }, "Select a model (" + candidates.length + ")"),
														candidates.map(function (model) {
															return h(
																"option",
																{ key: model.id, value: model.id },
																model.name && model.name !== model.id ? model.id + " — " + model.name : model.id
															);
														})
													)
												: h("input", {
														className: "cipher-input",
														type: "text",
														value: modelId,
														placeholder: option.modelPlaceholder,
														spellCheck: false,
														autoComplete: "off",
														onChange: function (event) { modelState[1](event.target.value); },
													})
										),
										h("p", { className: "cipher-hint" }, option.modelHint)
									),
									failure ? h("p", { className: "cipher-error" }, failure) : null,
									h(
										"div",
										{ className: "cipher-actions" },
										h(
											"button",
											{ type: "button", className: "cipher-btn", disabled: busy, onClick: onClose },
											"Cancel"
										),
										h(
											"button",
											{
												type: "button",
												className: "cipher-btn cipher-btn-primary",
												disabled: busy,
												onClick: connect,
											},
											busy ? "Saving..." : "Save and connect"
										)
									)
								]
					)
				),
				document.body
			);
		}

		function SetupEntry(props) {
			var wide = props && props.wide !== false;
			var open = useState(false);
			useEffect(function () {
				if (!open[0]) return;
				function onKey(event) {
					if (event.key === "Escape") open[1](false);
				}
				window.addEventListener("keydown", onKey);
				return function () {
					window.removeEventListener("keydown", onKey);
				};
			}, [open[0]]);
			return h(
				"div",
				{ style: { width: "100%" } },
				h(
					"button",
					{
						type: "button",
						className: wide ? "cipher-setup" : "cipher-setup cipher-setup-rail",
						title: "Connect a model to CIPHER",
						"aria-label": "Connect a model to CIPHER",
						onClick: function () {
							open[1](true);
						},
					},
					h(
						"span",
						{ className: "cipher-setup-glyph" },
						h(
							"svg",
							{ width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
							h("circle", { cx: 8, cy: 12, r: 3.2, stroke: "currentColor", strokeWidth: 1.7 }),
							h("path", {
								d: "M11.2 12H21M17 12v3M20 12v2.4",
								stroke: "currentColor",
								strokeWidth: 1.7,
								strokeLinecap: "round",
							})
						)
					),
					wide ? h("span", null, "Set up model key") : null
				),
				open[0] ? h(SetupCard, { onClose: function () { open[1](false); } }) : null
			);
		}

		var CYBER_PACKS = [
			["secure-config", "Secure configuration", "Review local configuration and recommend least-privilege hardening."],
			["app-review", "Application review", "Review source code and local test fixtures for security defects and fixes."],
			["authorized-validation", "Authorized validation", "Plan non-destructive checks for a clearly scoped local lab."],
			["code-hardening", "Code hardening", "Implement focused security fixes and regression tests."],
			["blue-team-ir", "Blue team", "Triage logs and telemetry, preserve evidence, and improve detections."],
			["malware-triage", "Malware triage", "Safely review samples and indicators without executing or deploying malware."],
		];

		function CyberCard(props) {
			var onClose = props.onClose;
			return reactDom.createPortal(
				h(
					"div",
					{
						className: "cipher-overlay",
						role: "presentation",
						onMouseDown: function (event) {
							if (event.target === event.currentTarget) onClose();
						},
					},
					h(
						"div",
						{
							className: "cipher-card",
							role: "dialog",
							"aria-modal": "true",
							"aria-label": "CIPHER cyber toolkit",
						},
						h("h2", null, "CIPHER cyber toolkit"),
						h(
							"p",
							null,
							"Security focus areas for authorized work. CIPHER defaults to defensive analysis and asks before any active test."
						),
						h(
							"div",
							{ className: "cipher-provider" },
							CYBER_PACKS.map(function (pack) {
								return h(
									"p",
									{ key: pack[0] },
									h("code", null, pack[0]),
									" — ",
									h("strong", null, pack[1]),
									": ",
									pack[2]
								);
							})
						),
						h("h3", null, "Postures"),
						h(
							"p",
							null,
							"Red Team, Blue Team, and Research Mode are agent presets. Each has separate instructions and tools; shared safety rules apply to all."
						),
						h("h3", null, "Admin permission"),
						h(
							"p",
							null,
							"Settings → General → Permission → Admin (full access) removes sandbox limits and approval prompts after CIPHER asks you to confirm. For OS-level administrator rights, close CIPHER and launch CIPHER-ADMIN.bat (Windows) or sudo ./cipher-admin.sh (Kali)."
						),
						h(
							"div",
							{ className: "cipher-actions" },
							h(
								"button",
								{ type: "button", className: "cipher-btn", onClick: onClose },
								"Close"
							),
							h(
								"button",
								{
									type: "button",
									className: "cipher-btn cipher-btn-primary",
									onClick: function () {
										onClose();
										window.setTimeout(function () { openSettingsSection("General"); }, 80);
									},
								},
								"Open Settings"
							)
						)
					)
				),
				document.body
			);
		}

		function CyberEntry(props) {
			var wide = props && props.wide !== false;
			var open = useState(false);
			useEffect(function () {
				if (!open[0]) return;
				function onKey(event) {
					if (event.key === "Escape") open[1](false);
				}
				window.addEventListener("keydown", onKey);
				return function () {
					window.removeEventListener("keydown", onKey);
				};
			}, [open[0]]);
			return h(
				"div",
				{ style: { width: "100%" } },
				h(
					"button",
					{
						type: "button",
						className: wide ? "cipher-setup" : "cipher-setup cipher-setup-rail",
						title: "CIPHER cyber toolkit",
						"aria-label": "CIPHER cyber toolkit",
						onClick: function () { open[1](true); },
					},
					h(
						"span",
						{ className: "cipher-setup-glyph" },
						h(
							"svg",
							{ width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
							h("path", {
								d: "M12 2.8 4.8 5.8v6.1c0 4.2 3 7.3 7.2 9.3 4.2-2 7.2-5.1 7.2-9.3V5.8L12 2.8Z",
								stroke: "currentColor",
								strokeWidth: 1.6,
								strokeLinejoin: "round",
							}),
							h("path", {
								d: "M9.4 12.1l1.9 1.9 3.5-3.9",
								stroke: "currentColor",
								strokeWidth: 1.6,
								strokeLinecap: "round",
								strokeLinejoin: "round",
							})
						)
					),
					wide ? h("span", null, "Cyber toolkit") : null
				),
				open[0] ? h(CyberCard, { onClose: function () { open[1](false); } }) : null
			);
		}

		function formatBytes(bytes) {
			if (!bytes) return "0 B";
			if (bytes < 1024) return bytes + " B";
			return (bytes / 1024).toFixed(1).replace(/\.0$/, "") + " KB";
		}

		function formatWhen(iso) {
			if (!iso) return "";
			var when = new Date(iso);
			if (isNaN(when.getTime())) return "";
			return when.toLocaleString();
		}

		var INSTRUCTION_MODES = [
			{ id: "shared", label: "Shared safety", description: "Read-only rules applied to every mode." },
			{ id: "red-team", label: "Red Team", description: "Local CLI and files only; web, jobs, schedules, goals, and delegation are disabled." },
			{ id: "blue-team", label: "Blue Team", description: "Defensive tools, web research, and workflow helpers are enabled." },
			{ id: "research-mode", label: "Research Mode", description: "Local CLI/files and web research; jobs, schedules, goals, and delegation are disabled." },
		];

		// Instructions are selected by a fixed mode allowlist; shared safety
		// policy is readable here but can only be changed outside this editor.
		function instructionsRequest(method, mode, body) {
			var init = { method: method, credentials: "same-origin", headers: {} };
			if (body !== undefined) {
				init.headers["content-type"] = "application/json";
				init.body = JSON.stringify(body);
			}
			var url = "/cipher/agent-instructions?mode=" + encodeURIComponent(mode);
			return window.fetch(url, init).then(function (response) {
				return response
					.json()
					.catch(function () { return {}; })
					.then(function (payload) {
						if (!response.ok) throw new Error((payload && payload.error) || "CIPHER returned HTTP " + response.status + ".");
						return payload;
					});
			});
		}

		function AgentInstructionsEditor() {
			var modeState = useState("shared");
			var contentState = useState("");
			var baselineState = useState("");
			var metaState = useState(null);
			var statusState = useState("loading");
			var failureState = useState("");
			var noticeState = useState("");

			var mode = modeState[0];
			var content = contentState[0];
			var baseline = baselineState[0];
			var meta = metaState[0];
			var status = statusState[0];
			var failure = failureState[0];
			var notice = noticeState[0];
			var dirty = content !== baseline;
			var busy = status === "loading" || status === "saving";
			var modeInfo = INSTRUCTION_MODES.filter(function (entry) { return entry.id === mode; })[0];
			var canEdit = !!(meta && meta.editable);

			function apply(saved) {
				contentState[1](saved.content || "");
				baselineState[1](saved.content || "");
				metaState[1](saved);
			}

			function load(selectedMode) {
				var targetMode = selectedMode || mode;
				statusState[1]("loading");
				failureState[1]("");
				noticeState[1]("");
				contentState[1]("");
				baselineState[1]("");
				metaState[1](null);
				instructionsRequest("GET", targetMode)
					.then(function (saved) {
						apply(saved);
						statusState[1]("idle");
					})
					.catch(function (error) {
						failureState[1](String((error && error.message) || error));
						statusState[1]("idle");
					});
			}

			function selectMode(nextMode) {
				if (busy || nextMode === mode) return;
				if (dirty && !window.confirm("Discard unsaved changes to this mode?")) return;
				modeState[1](nextMode);
				statusState[1]("loading");
				failureState[1]("");
				noticeState[1]("");
			}

			function reload() {
				if (busy) return;
				if (dirty && !window.confirm("Discard unsaved changes to this mode?")) return;
				load(mode);
			}

			function save() {
				if (busy || !canEdit) return;
				statusState[1]("saving");
				failureState[1]("");
				noticeState[1]("");
				instructionsRequest("PUT", mode, { content: content })
					.then(function (saved) {
						apply(saved);
						statusState[1]("idle");
						noticeState[1]("Saved. New " + modeInfo.label + " sessions use these instructions.");
					})
					.catch(function (error) {
						failureState[1](String((error && error.message) || error));
						statusState[1]("idle");
					});
			}

			useEffect(function () {
				load(mode);
			}, [mode]);

			return h(
				"div",
				null,
				h("h3", null, "Agent instructions"),
				h(
					"p",
					null,
					"Each preset loads shared safety rules plus its own editable instructions and tool permissions."
				),
				h(
					"div",
					{ className: "cipher-tabs", role: "tablist", "aria-label": "CIPHER instruction modes" },
					INSTRUCTION_MODES.map(function (entry) {
						return h(
							"button",
							{
								key: entry.id,
								type: "button",
								className: "cipher-tab",
								role: "tab",
								"aria-selected": mode === entry.id,
								"aria-pressed": mode === entry.id,
								disabled: busy,
								onClick: function () { selectMode(entry.id); },
							},
							entry.label
						);
					})
				),
				h("p", { className: "cipher-hint" }, modeInfo.description),
				h(
					"div",
					{ className: "cipher-meta" },
					meta && meta.path ? h("code", null, meta.path) : h("span", null, "Loading instructions..."),
					meta ? h("span", null, formatBytes(new TextEncoder().encode(content).length) + " of " + formatBytes(meta.maxBytes)) : null,
					meta && meta.updatedAt ? h("span", null, "Updated " + formatWhen(meta.updatedAt)) : null,
					meta && meta.editable ? h("span", { className: "cipher-pill" }, "Editable mode") : null,
					meta && !meta.editable ? h("span", { className: "cipher-pill" }, "Read-only shared rules") : null,
					meta && meta.exists === false ? h("span", null, "The file does not exist yet. Saving creates it.") : null
				),
				h("textarea", {
					className: "cipher-editor",
					value: content,
					spellCheck: false,
					disabled: busy,
					readOnly: !canEdit,
					"aria-label": "CIPHER " + modeInfo.label + " instructions",
					placeholder: mode === "shared" ? "Shared safety rules are protected in this editor." : "# " + modeInfo.label + " instructions",
					onChange: function (event) { contentState[1](event.target.value); noticeState[1](""); },
					onKeyDown: function (event) {
						if ((event.ctrlKey || event.metaKey) && String(event.key).toLowerCase() === "s") {
							event.preventDefault();
							if (dirty) save();
						}
					},
				}),
				h(
					"div",
					{ className: "cipher-editor-actions" },
					h(
						"button",
						{ type: "button", className: "cipher-btn", disabled: busy, onClick: reload },
						"Reload"
					),
					h(
						"button",
						{ type: "button", className: "cipher-btn cipher-btn-primary", disabled: busy || !dirty || !canEdit, onClick: save },
						status === "saving" ? "Saving..." : "Save changes"
					),
					dirty && status !== "saving" ? h("span", { className: "cipher-dirty" }, "Unsaved changes · Ctrl+S") : null
				),
				notice ? h("p", { className: "cipher-ok" }, notice) : null,
				failure ? h("p", { className: "cipher-error" }, failure) : null,
				h(
					"p",
					{ className: "cipher-hint" },
					mode === "shared"
						? "Shared safety rules are locked here and apply to every preset."
						: "Saved to " + (meta && meta.path ? meta.path : modeInfo.label + " instructions") + ". New sessions in this mode load this file; its previous revision is kept as a .bak file."
				)
			);
		}

		function CipherSettings() {
			return h(
				"div",
				{ className: "cipher-settings" },
				h("h2", null, "CIPHER security setup"),
				h("p", null, "Your local assistant for authorized security engineering, defensive analysis, and secure coding."),
				h(AgentInstructionsEditor, null),
				h("h3", null, "Model providers"),
				h(
					"p",
					null,
					"Three routes: Venice, OpenRouter, or any custom OpenAI/Anthropic-compatible endpoint. Open Models to add the key and pick a model."
				),
				h(
					"button",
					{
						type: "button",
						className: "cipher-btn",
						onClick: function () { window.setTimeout(openSettingsModels, 80); },
					},
					"Open Models"
				),
				h("h3", null, "Agent posture"),
				h(
					"p",
					null,
					"Red Team, Blue Team, Research Mode. Switch under Settings → Agent presets; each mode loads its own instructions and tool permissions. Shared safety rules apply to all."
				),
				h("h3", null, "Admin permission"),
				h(
					"p",
					null,
					"General → Permission → Admin (full access) removes sandbox limits and approval prompts; CIPHER asks you to confirm first. For OS-level administrator rights, launch CIPHER-ADMIN.bat (Windows) or sudo ./cipher-admin.sh (Kali)."
				),
				h("h3", null, "Cyber skills"),
				h(
					"p",
					null,
					CYBER_PACKS.map(function (pack) { return pack[0]; }).join(" · ")
				)
			);
		}

		var inject = ["slots"];

		function apply(ctx) {
			installStyles();
			ownTitle();
			if (typeof MutationObserver !== "undefined" && typeof document !== "undefined") {
				var observer = new MutationObserver(ownTitle);
				observer.observe(document.head, { childList: true, subtree: true });
				ctx.effect(function () {
					return function () {
						observer.disconnect();
					};
				}, "cipher-brand: document title");
			}
			var scrubber = startScrubber();
			if (scrubber !== null) {
				ctx.effect(function () {
					return function () {
						scrubber.disconnect();
					};
				}, "cipher-brand: UI copy and status branding");
			}
			ctx.slots.inject("sidebar.brand.mark", () => ctx.slots.inject("sidebar.brand.name", function* () {
				yield ctx.slots.register({ name: "sidebar.brand.mark" }, CipherMark);
				yield ctx.slots.register({ name: "sidebar.brand.name" }, CipherName);
			}));
			ctx.slots.inject("conversation.hero.brand.mark", () => ctx.slots.register({
				name: "conversation.hero.brand.mark",
			}, HeroMark));
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "cipher-setup",
			}, SetupEntry));
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "cipher-cyber",
			}, CyberEntry));
			ctx.slots.inject("settings.section", () => {
				try {
					return ctx.slots.register({
						name: "settings.section",
						id: "cipher",
						order: 5,
						label: function () { return "CIPHER"; },
					}, CipherSettings);
				} catch (error) {
					if (typeof console !== "undefined") console.warn("cipher-brand: settings section unavailable", error);
					return function () {};
				}
			});
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
