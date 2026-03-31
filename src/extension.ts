/**
 * Browser Preview - VSCode Extension entry point.
 *
 * @author Eno Yao
 */

import * as vscode from 'vscode';
import { openBrowser } from './index';

/**
 * Called when the extension is activated.
 * Registers the "Preview in Default Browser" command.
 */
export function activate(context: vscode.ExtensionContext): void {
  console.log('Congratulations, your extension "openBrowser" is now active!');

  const openDefaultCommand = vscode.commands.registerCommand(
	'extension.previewInDefaultBrowser',
	(path?: vscode.Uri) => {
	  openBrowser(path);
	},
  );

  context.subscriptions.push(openDefaultCommand);
}

/** Called when the extension is deactivated. */
export function deactivate(): void {
  // No cleanup needed
}