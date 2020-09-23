import * as vscode from 'vscode';
import { open, defaultBrowser, standardizedBrowserName } from './util';

function currentPageUri() {
    return vscode.window.activeTextEditor
        && vscode.window.activeTextEditor.document
        && vscode.window.activeTextEditor.document.uri;
}

export const openBrowser = (path: any): void => {
    let uri;
    if (path) {
        uri = path.fsPath;
    } else {
        const _path = currentPageUri();
        uri = _path && _path.fsPath;
    }
    const browser = standardizedBrowserName(defaultBrowser());
    open(uri, browser);
};