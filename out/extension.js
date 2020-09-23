"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const index_1 = require("./index");
function activate(context) {
    console.log('Congratulations, your extension "openBrowser" is now active!');
    let openDefaultCommand = vscode.commands.registerCommand('extension.previewInDefaultBrowser', (path) => {
        index_1.openBrowser(path);
    });
    context.subscriptions.push(openDefaultCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map