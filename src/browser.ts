import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const BROWSER_NAMES: Record<string, string | string[]> = {
  chrome: ['google chrome', 'chrome'],
  firefox: ['firefox'],
  safari: ['safari'],
  edge: ['microsoft edge', 'msedge'],
  default: '',
};

export function openInBrowser(
  filePath: string,
  context: vscode.ExtensionContext
): void {
  if (!fs.existsSync(filePath)) {
    vscode.window.showErrorMessage(`File not found: ${filePath}`);
    return;
  }

  const config = vscode.workspace.getConfiguration('browserPreview');
  const browserKey = config.get<string>('defaultBrowser', 'default');
  const browserApp = BROWSER_NAMES[browserKey] ?? '';

  import('open').then(({ default: open }) => {
    const options = browserApp ? { app: { name: browserApp as string } } : {};
    open(filePath, options).catch((err: Error) => {
      vscode.window.showErrorMessage(
        `Failed to open browser "${browserKey}": ${err.message}. ` +
        `Please ensure the browser is installed correctly.`
      );
    });
  });
}
