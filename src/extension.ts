// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext } from "vscode";
import {
  AutoMatchCommand,
  AutoMatchWithRegexCommand,
  AutoMatchWithSelectionCommand,
  DecodeURIComponentCommand,
  HexToASCIICommand,
} from "./commands";
import { ICommandConstructor } from "./commands/constant";

function registerCommand(context: ExtensionContext) {
  return {
    append(clazz: ICommandConstructor) {
      new clazz(context).register();
    },
  };
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const handlers = registerCommand(context);

  handlers.append(HexToASCIICommand);
  handlers.append(AutoMatchCommand);
  handlers.append(AutoMatchWithRegexCommand);
  handlers.append(AutoMatchWithSelectionCommand);
  handlers.append(DecodeURIComponentCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
