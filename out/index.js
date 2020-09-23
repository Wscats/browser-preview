"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const util_1 = require("./util");
function currentPageUri() {
    return vscode.window.activeTextEditor
        && vscode.window.activeTextEditor.document
        && vscode.window.activeTextEditor.document.uri;
}
exports.openBrowser = (path) => {
    let uri;
    if (path) {
        uri = path.fsPath;
    }
    else {
        const _path = currentPageUri();
        uri = _path && _path.fsPath;
    }
    const browser = util_1.standardizedBrowserName(util_1.defaultBrowser());
    util_1.open(uri, browser);
};
//# sourceMappingURL=index.js.map