import { window, workspace } from "vscode";
import { AutoMatchCommand } from "./auto-match";

export class AutoMatchWithRegexCommand extends AutoMatchCommand {
  readonly name?: string = "sc.automatch.with.regex";

  executor() {
    const config = workspace.getConfiguration("sc");
    const pattern = config.get<string>("pattern");

    window
      .showInputBox({
        title: "输入提取正则表达式",
        prompt: "输入正则表达式",
        placeHolder: "正则表达式，需要一组提取括号",
        value: pattern,
      })
      .then((regex) => this.doExecutor(new RegExp(regex!)));
  }
}
