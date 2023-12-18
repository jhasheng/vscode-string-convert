import { Command } from "./constant";

export class DecodeURIComponentCommand extends Command {

  readonly name?: string = "sc.decode.uri.component";

  executor() {
    // 写入内容
    this.editor.edit((builder) => {
      for (let range of this.editor.selections) {
        // 获取选中文字
        let content = this.editor.document.getText(range);
        // 转换内容
        const raw = decodeURIComponent(content);
        
        builder.replace(range, raw);
      }
    });
    
  }
}
