import Config from './config';
import * as vscode from 'vscode';

const opn = require('open');

/**
 * get standardized browser name
 * @param name String
 */
export const standardizedBrowserName = (name: string = ''): string => {
    let _name = name.toLowerCase();
    const browser = Config.browsers.find(item => {
        return item.acceptName.indexOf(_name) !== -1;
    });

    return browser ? browser.standardName : '';
};

/**
 * get default browser name
 */
export const defaultBrowser = (): string => {
    const config = vscode.workspace.getConfiguration(Config.app);
    return config ? config.default : '';
};

export const open = (path: string, browser: string | string[] = ['google chrome', '----disable-web-security']) => {
    // const name = browser ? browser : standardizedBrowserName(defaultBrowser());
    // const name = standardizedBrowserName(browser);
    // console.log('path: ', path, ' name: ', name);
    opn(path, { app: browser })
        .catch((err: any) => {
            vscode.window.showErrorMessage(`Open browser failed!! Please check if you have installed the browser ${browser} correctly!`);
        });
};