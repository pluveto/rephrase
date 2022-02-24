import { Symbols } from "../model/runtime";

function model(modelId: string) {
  return Symbols.ModelMap.get(modelId)!;
}

function fields(modelId: string) {
  return Array.from(model(modelId).fields.values());
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

const t = { model, fields };

// Get model by modelId
export { t };
