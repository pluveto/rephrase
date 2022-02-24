import { Symbols } from "../model/runtime";

function model(modelId: string) {
  return Symbols.ModelMap.get(modelId)!;
}

function fields(modelId: string) {
  return Array.from(model(modelId).fields.values());
}

export enum IndentType {
  tab,
  space,
  spaceTab,
}

function indent(
  text: string,
  size: number,
  type: IndentType = IndentType.spaceTab,
  tabSize = 4,
  ignoreFirstLine = false
): string {
  let lines = text.split("\n");
  let result = "";
  let isFirstLine = true;
  let isLastLine = lines.length === 1;
  for (let line of lines) {
    if (isFirstLine && ignoreFirstLine) {
      isFirstLine = false;
      result += line + "\n";
      break;
    }
    let prefix = "";
    switch (type) {
      case IndentType.tab:
        prefix = "\t".repeat(size);
        break;
      case IndentType.space:
        prefix = " ".repeat(size);
        break;
      case IndentType.spaceTab:
        prefix = " ".repeat(size * tabSize);
        break;
    }
    result += prefix + line + isLastLine ? "" : "\n";
    isLastLine = false;
  }
  result.trimRight();
  return result;
}
// // traverse map and execute callback on each item then join into string
// function mapJoin<T>(
//   dict: Map<any, T>,
//   callback: (value: T, key: any) => string,
//   sep = ""
// ): string {
//   let arr: Array<string> = [];
//   dict.forEach((value, key) => {
//     arr.push(callback(value, key));
//   });
//   return arr.join(sep);
// }

const t = { model, fields, indent };

// Get model by modelId
export { t };
