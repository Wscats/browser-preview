import * as vscode from "vscode";
import { openInBrowser } from "./browser";
import { WebviewPanel } from "./webview";

// ─── Typed configuration access (spec.md 2.2) ────────────────────────────────
interface BrowserPreviewConfig {
  defaultBrowser: "internal" | "external";
  port: number;
  autoRefresh: boolean;
}

function getConfig(): BrowserPreviewConfig {
  const cfg = vscode.workspace.getConfiguration("browserPreview");
  return {
    defaultBrowser: cfg.get<"internal" | "external">("defaultBrowser", "internal"),
    port: cfg.get<number>("port", 0),
    autoRefresh: cfg.get<boolean>("autoRefresh", true),
  };
}

// ─── Extension state ─────────────────────────────────────────────────────────
let webviewPanel: WebviewPanel | undefined;
let fileWatcher: vscode.FileSystemWatcher | undefined;

export function activate(context: vscode.ExtensionContext): void {
  // Command: open in external browser
  const openBrowserCmd = vscode.commands.registerCommand(
    "browserPreview.openInBrowser",
    (uri?: vscode.Uri) => {
      const filePath = resolveFilePath(uri);
      if (!filePath) {
        void vscode.window.showErrorMessage("No HTML file is currently open.");
        return;
      }
      openInBrowser(filePath, context);
    },
  );

  // Command: open in in-editor Webview
  const openWebviewCmd = vscode.commands.registerCommand(
    "browserPreview.openInWebview",
    (uri?: vscode.Uri) => {
      const filePath = resolveFilePath(uri);
      if (!filePath) {
        void vscode.window.showErrorMessage("No HTML file is currently open.");
        return;
      }
      openInWebview(filePath, context);
    },
  );

  context.subscriptions.push(openBrowserCmd, openWebviewCmd);
}

function resolveFilePath(uri?: vscode.Uri): string | undefined {
  if (uri?.fsPath) {
    return uri.fsPath;
  }
  const editor = vscode.window.activeTextEditor;
  if (editor && editor.document.languageId === "html") {
    return editor.document.uri.fsPath;
  }
  return undefined;
}

function openInWebview(
  filePath: string,
  context: vscode.ExtensionContext,
): void {
  const { autoRefresh } = getConfig();

  if (webviewPanel) {
    webviewPanel.reveal(filePath);
  } else {
    webviewPanel = new WebviewPanel(context, filePath);
    webviewPanel.onDispose(() => {
      webviewPanel = undefined;
      fileWatcher?.dispose();
      fileWatcher = undefined;
    });
  }

  // Setup file watcher for live reload
  if (autoRefresh) {
    fileWatcher?.dispose();
    fileWatcher = vscode.workspace.createFileSystemWatcher(filePath);
    fileWatcher.onDidChange(() => {
      webviewPanel?.refresh(filePath);
    });
    context.subscriptions.push(fileWatcher);
  }
}

export function deactivate(): void {
  webviewPanel?.dispose();
  fileWatcher?.dispose();
}
