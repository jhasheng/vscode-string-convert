// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, ExtensionContext, TextEditor } from "vscode";
import {
  AutoMatchCommand,
  AutoMatchWithRegexCommand,
  AutoMatchWithSelectionCommand,
  HexToASCIICommand,
} from "./commands";
import { ICommandConstructor } from "./commands/constant";

function registerCommand(context: ExtensionContext, editor: TextEditor) {
  return {
    append(clazz: ICommandConstructor) {
      new clazz(context, editor).register();
    },
  };
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  let editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  const handlers = registerCommand(context, editor!);

  handlers.append(HexToASCIICommand);
  handlers.append(AutoMatchCommand);
  handlers.append(AutoMatchWithRegexCommand);
  handlers.append(AutoMatchWithSelectionCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
