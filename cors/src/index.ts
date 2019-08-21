import * as vscode from 'vscode';
import { open, defaultBrowser, standardizedBrowserName } from './util';
// import * as program from 'commander';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const exec = require('child_process').exec;


function currentPageUri() {
    return vscode.window.activeTextEditor
        && vscode.window.activeTextEditor.document
        && vscode.window.activeTextEditor.document.uri;
}

export const openUnsafeBrowser = (path: any): void => {
    console.log(path)
    let uri;
    if (path) {
        uri = path.fsPath;
    } else {
        const _path = currentPageUri();
        uri = _path && _path.fsPath;
    }
    // async function lsExample() {
    //     const { stdout, stderr } = await exec(`open -n -a /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --new-window ${path}`);
    //     // const { stdout, stderr } = await exec(`open -a Google\ Chrome --args --disable-web-security --user-data-dir -–allow-file-access-from-files`);
    //     // const { stdout, stderr } = await exec(`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --new-window ${path}`);
    //     console.log('stdout:', stdout);
    //     console.log('stderr:', stderr);
    // }
    // lsExample();

    // exec(`open -n -a /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --new-window file:///Users/eno/Documents/Wscats/1000phone/1810/eno-loader/tests/ajax.html`, (error: any, stdout: any, stderr: any) => {
    //     if (error) {
    //         console.error(`执行出错: ${error}`);
    //         return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     console.log(`stderr: ${stderr}`);
    // });
    // program.option(`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security--new-window file:///Users/eno/Documents/Wscats/1000phone/1810/eno-loader/tests/ajax.html`)
    // const browser = standardizedBrowserName(defaultBrowser());
    // program.option(`open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --new-window ${path}`);
    // console.log(browser);
    // ['google chrome', '----disable-web-security']
    // open(uri, browser);
    open(uri, ['----disable-web-security']);
    // open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --new-window www.baidu.com
};