import {
  classNameOf,
  extendMap,
  NullableOrUndef,
  valueOrDefault,
} from "../util/type";
import { TableOptions } from "./base";
import { Symbols } from "./runtime";
import { IField, IModel, JoinOptions } from "./types";



export function Table(tableOptions: TableOptions) {
  return function (constructor: Function) {
    const modelId = classNameOf(constructor);
    let fields: Map<string, IField> = new Map();
    // if is extended from parent, then load parent's fields
    let parent = constructor.prototype.__proto__;
    if (parent) {
      let parentModelId = classNameOf(parent.constructor);
      console.debug(`${modelId} extends ${parentModelId}`);
      let parentFields = Symbols.getModelFields(parentModelId);
      console.log("parentFields", parentFields);
      fields = parentFields;
    }

    const model: IModel = {
      id: modelId,
      table: tableOptions.name,
      fields: new Map(),
    };
    Symbols.addModel(model);
    Symbols.insertModelFields(modelId, fields);
  };
}

export function Field(meta: IField) {
  function processJoin(join: NullableOrUndef<JoinOptions>): JoinOptions | null {
    if (!join) {
      return null;
    }
    return join;
  }

  return (targetObject: Object, propertyKey: string) => {
    if (
      typeof targetObject.constructor.prototype["__fields__"] === "undefined"
    ) {
      targetObject.constructor.prototype["__fields__"] = [];
    }

    let field: Required<IField> = {
      id: propertyKey,
      display: meta.display,
      editable: valueOrDefault(meta.editable, true),
      join: processJoin(meta.join),
    };

    Symbols.upsertModelField(classNameOf(targetObject.constructor), field);
  };
}
