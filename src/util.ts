/**
 * Browser Preview - Utility functions.
 * Browser name standardization and opening logic.
 *
 * @author Eno Yao
 */

import Config from './config';
import * as vscode from 'vscode';

const opn = require('open');

/** Standardize a browser name to its platform-specific executable name. */
export const standardizedBrowserName = (name: string = ''): string => {
  const normalizedName = name.toLowerCase();
  const browser = Config.browsers.find(
    item => item.acceptName.indexOf(normalizedName) !== -1,
  );
  return browser ? browser.standardName : '';
};

/** Get the default browser from VS Code configuration. */
export const defaultBrowser = (): string => {
  const config = vscode.workspace.getConfiguration(Config.app);
  return config ? config.default : '';
};

/** Open a path in the specified browser. */
export const open = (targetPath: string, browser: string | string[]): void => {
  opn(targetPath, { app: browser }).catch((_err: unknown) => {
    vscode.window.showErrorMessage(
      `Open browser failed!! Please check if you have installed the browser ${String(browser)} correctly!`,
    );
  });
};