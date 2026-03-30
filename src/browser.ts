import * as vscode from "vscode";
import { stat } from "node:fs/promises";

const BROWSER_NAMES: Record<string, string | string[]> = {
  chrome: ["google chrome", "chrome"],
  firefox: ["firefox"],
  safari: ["safari"],
  edge: ["microsoft edge", "msedge"],
  default: "",
};

// ─── Shared OutputChannel (spec.md 2.2: no console.log in production) ────────
let outputChannel: vscode.OutputChannel | undefined;

function getOutputChannel(): vscode.OutputChannel {
  outputChannel ??= vscode.window.createOutputChannel("Browser Preview");
  return outputChannel;
}

export function openInBrowser(
  filePath: string,
  context: vscode.ExtensionContext,
): void {
  const log = getOutputChannel();

  // Async file existence check — no blocking I/O on the extension host thread
  stat(filePath)
    .then(() => {
      const config = vscode.workspace.getConfiguration("browserPreview");
      const browserKey = config.get<string>("defaultBrowser", "default");
      const browserApp = BROWSER_NAMES[browserKey] ?? "";

      log.appendLine(`[open] ${filePath} → browser: ${browserKey}`);

      return import("open").then(({ default: open }) => {
        const options = browserApp ? { app: { name: browserApp as string } } : {};
        return open(filePath, options);
      });
    })
    .catch((err: Error) => {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        void vscode.window.showErrorMessage(`File not found: ${filePath}`);
      } else {
        log.appendLine(`[error] Failed to open browser: ${err.message}`);
        void vscode.window.showErrorMessage(
          `Failed to open browser: ${err.message}. Please ensure the browser is installed.`,
        );
      }
    });

  // Register channel disposal with extension context
  if (!context.subscriptions.includes(getOutputChannel() as unknown as vscode.Disposable)) {
    context.subscriptions.push(getOutputChannel());
  }
}
