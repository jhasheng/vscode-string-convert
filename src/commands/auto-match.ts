import { Range, Selection, window, workspace } from "vscode";
import { Command } from "./constant";

export class AutoMatchCommand extends Command {

  readonly name?: string = "sc.automatch";

  protected doExecutor(regex: RegExp) {
    let selections = [];
    // 遍历文档行
    for (let i = 0, l = this.editor.document.lineCount; i < l; i++) {
      // 取出行内容
      let { text } = this.editor.document.lineAt(i);
      // 获取内容
      let matches = text.match(regex);
      if (!matches) {
        continue;
      }
      const min = this.getConfig<number>("length:min")!;
      // 匹配内容长度小于 2
      if (matches![1].length < min) {
        continue;
      }
      // 内容绝对（本行）起始位置
      let start = matches.index! + matches![0].indexOf(matches![1]);
      // 稳中匹配内容
      let range = new Range(i, start, i, matches![1].length + start);
      selections.push(new Selection(range.start, range.end));
    }

    this.editor.selections = selections;
  }

  executor() {
    this.doExecutor(new RegExp(this.getConfig("pattern")!));
  }
}
