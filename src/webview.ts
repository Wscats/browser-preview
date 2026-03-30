import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class WebviewPanel {
  private panel: vscode.WebviewPanel;
  private disposeCallbacks: Array<() => void> = [];

  constructor(
    private readonly context: vscode.ExtensionContext,
    filePath: string
  ) {
    const fileName = path.basename(filePath);
    this.panel = vscode.window.createWebviewPanel(
      'browserPreview',
      `Preview: ${fileName}`,
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.file(path.dirname(filePath)),
        ],
      }
    );

    this.panel.webview.html = this.buildHtml(filePath);

    this.panel.onDidDispose(() => {
      this.disposeCallbacks.forEach(cb => cb());
    });
  }

  reveal(filePath: string): void {
    this.panel.title = `Preview: ${path.basename(filePath)}`;
    this.panel.webview.html = this.buildHtml(filePath);
    this.panel.reveal(vscode.ViewColumn.Beside);
  }

  refresh(filePath: string): void {
    this.panel.webview.html = this.buildHtml(filePath);
  }

  dispose(): void {
    this.panel.dispose();
  }

  onDispose(callback: () => void): void {
    this.disposeCallbacks.push(callback);
  }

  private buildHtml(filePath: string): string {
    if (!fs.existsSync(filePath)) {
      return `<html><body><p style="color:red">File not found: ${filePath}</p></body></html>`;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    const webview = this.panel.webview;
    const dirUri = vscode.Uri.file(path.dirname(filePath));

    // Inject live-reload script
    const liveReloadScript = `
      <script>
        // Live reload: listen for vscode message
        window.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'refresh') {
            window.location.reload();
          }
        });
      </script>
    `;

    // Replace local resource paths with webview URIs
    content = content.replace(
      /(src|href)="(?!https?:\/\/|\/\/|data:)([^"]+)"/g,
      (match, attr, src) => {
        const absPath = path.resolve(path.dirname(filePath), src);
        const uri = webview.asWebviewUri(vscode.Uri.file(absPath));
        return `${attr}="${uri}"`;
      }
    );

    // Inject live reload script before </body>
    content = content.replace('</body>', `${liveReloadScript}</body>`);

    return content;
  }
}
