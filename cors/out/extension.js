"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const index_1 = require("./index");
const jade_1 = require("./jade");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cors" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hi!');
    });
    let openDefaultCommand = vscode.commands.registerCommand('extension.openUnsafeBrowser', (path) => {
        vscode.window.showInformationMessage('Hi! Hi!');
        index_1.openUnsafeBrowser(path);
    });
    let compileJadeFileCommand = vscode.commands.registerCommand('extension.transformJade', (path) => {
        vscode.window.showInformationMessage('Hi! Hi! Hi!');
        jade_1.compileJadeFile(path);
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(openDefaultCommand);
    context.subscriptions.push(compileJadeFileCommand);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map