/**
 * Browser Preview - Main module.
 * Opens the current file or a given URI in the default browser.
 *
 * @author Eno Yao
 */

import * as vscode from 'vscode';
import { open, defaultBrowser, standardizedBrowserName } from './util';

/**
 * Get the URI of the currently active document.
 */
function currentPageUri(): vscode.Uri | undefined {
  return vscode.window.activeTextEditor?.document?.uri;
}

/**
 * Open a file in the default browser.
 *
 * @param path - A VS Code URI, or undefined to use the current document.
 */
export const openBrowser = (path?: vscode.Uri): void => {
  let uri: string | undefined;

  if (path) {
    uri = path.fsPath;
  } else {
    const currentUri = currentPageUri();
    uri = currentUri?.fsPath;
  }

  if (!uri) {
    return;
  }

  const browser = standardizedBrowserName(defaultBrowser());
  open(uri, browser);
};