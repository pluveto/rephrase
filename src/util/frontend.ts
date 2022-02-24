import { componentType } from "../model/types";

export function inferComponentType(typeName: string): componentType {
  switch (typeName) {
    case "String":
      return "input";
    case "Number":
      return "integer";
    default:
      return "input"
  }
}
