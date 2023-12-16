import { Selection, workspace } from "vscode";
import { Command } from "./constant";

export class AutoMatchWithSelectionCommand extends Command {
  readonly name?: string = "sc.automatch.with.selection";

  executor() {
    const config = workspace.getConfiguration("sc");
    const pattern = config.get<string>("pattern");

    // 原点 = 选中区域的起始位置 (第几行,第几个字符)
    const o = this.editor.selections[0];
    // 获取选中内容
    const text = this.editor.document.getText(o);
    const regex = new RegExp(pattern!, "g");
    // 选中匹配开始位置 在整个文档中是第几个字符
    let base = this.editor.document.offsetAt(o.start);
    let matches: RegExpExecArray | null = null;
    let selections = [];
    while ((matches = regex.exec(text)) !== null) {
      // 匹配结果在整个文档中的位置 = 开始位置 + 偏移 + 提取内容在匹配内容的位置
      const offset = base + matches.index + matches[0].indexOf(matches[1]);
      // 将位置转换成坐标(第几行,第几个字符)
      let start = this.editor.document.positionAt(offset);
      let end = this.editor.document.positionAt(offset + matches[1].length);
      // 保存选定区域
      selections.push(new Selection(start, end));
    }
    this.editor.selections = selections;
  }
}
