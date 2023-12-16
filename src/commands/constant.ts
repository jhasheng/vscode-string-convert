import { ExtensionContext, TextEditor, commands, workspace } from "vscode";

export interface ICommandConstructor {
  new (context: ExtensionContext, editor: TextEditor): ICommand;
}

export interface ICommand {
  readonly name?: string;

  editor: TextEditor;

  context: ExtensionContext;

  executor(): void;

  register(): void;
}

export abstract class Command implements ICommand {
  readonly name?: string;

  editor: TextEditor;

  context: ExtensionContext;

  constructor(context: ExtensionContext, editor: TextEditor) {
    this.editor = editor;
    this.context = context;
  }

  register() {
    let disposable = commands.registerCommand(
      this.name!,
      this.executor.bind(this)
    );
    this.context.subscriptions.push(disposable);
  }

  getConfig<T>(field: string): T | undefined {
    const config = workspace.getConfiguration("sc");
    return config.get<T>(field);
  }

  abstract executor(): void;
}
