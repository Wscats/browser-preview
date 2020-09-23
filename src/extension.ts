import * as vscode from 'vscode';
import {
	openBrowser,
} from './index';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "openBrowser" is now active!');
	let openDefaultCommand = vscode.commands.registerCommand('extension.previewInDefaultBrowser', (path) => {
		openBrowser(path);
	});
	context.subscriptions.push(openDefaultCommand);
}

export function deactivate() { }