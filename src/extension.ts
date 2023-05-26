import * as vscode from 'vscode';

let disposable: vscode.Disposable | undefined;
let neededText;

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("Locked and loaded!");
  let disposable = vscode.commands.registerCommand('jsfuncsupport--.writer', () => {
    vscode.workspace.onDidChangeTextDocument(event => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const nmbrRegex = /\d+/; // Regular expression to match one or more digits
        
        for (let i = 0; i < document.lineCount; i++) {
          const line = document.lineAt(i).text.trim();
        
          const match = line.match(nmbrRegex);
          let nmbr = 0;
          if (match) {
            nmbr = parseInt(match[0]);
          }
          neededText="";
          switch (line) {
            case `// Write me a switch case with ${nmbr} cases`:
              // Generate switch case but with as many cases as you'd like!;
              neededText = `switch (someVariable) {
              `;
                    for (let i = 1; i <= nmbr; i++) {
                      neededText += `  case ${i}:
                  // Case ${i} code here
                  break;
              `;
                    }
                    neededText += `  default:
                  break;
              }`;
              vscode.window.showInformationMessage(`Generated switch case with ${nmbr} cases`);
              break;
            case `Write me a console return message`:
              neededText = `console.log()`;
              neededText += `return;`
              break;
          }
          // Replace the current line with the generated switch case
          editor.edit((editBuilder) => {
            editBuilder.replace(
              document.validateRange(new vscode.Range(i, 0, i, line.length)),neededText);
          });
        }
      }
    });
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {
  if (disposable) {
    disposable.dispose();
  }
}
