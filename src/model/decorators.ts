import {
  classNameOf,
  extendMap,
  NullableOrUndef,
  toPrimitive,
  valueOrDefault,
} from "../util/type";
import { Symbols } from "./runtime";
import {
  FieldOptions,
  IField,
  IModel,
  JoinOptions,
  ModelOptions,
} from "./types";
import "reflect-metadata";
import { inferComponentType } from "../util/frontend";
import { camelCase, snakeCase } from "change-case";

export function Model(modelOptions: ModelOptions) {
  return function (constructor: Function) {
    const modelId = classNameOf(constructor);
    let fields: Map<string, IField> = new Map();
    // if is extended from parent, then load parent's fields
    let parent = constructor.prototype.__proto__;
    let parentModelId = "";
    if (parent) {
      parentModelId = classNameOf(parent.constructor);
      console.debug(`${modelId} extends ${parentModelId}`);
      let parentFields = Symbols.getModelFields(parentModelId);
      // console.log("parentFields", parentFields);
      fields = parentFields;
    }

    const model: IModel = (() => {
      let moduleName = modelOptions.module || "";

      function buildTableName(moduleName: string, modelId: string): string {
        return moduleName.toLowerCase() + "_" + snakeCase(modelId);
      }

      function buildServiceName(moduleName: string, modelId: string): string {
        return camelCase(moduleName) + "." + camelCase(modelId);
      }

      let table = modelOptions.table || buildTableName(moduleName, modelId);
      return {
        id: modelId,
        module: moduleName,
        table,
        extends: parentModelId,
        label: modelOptions.label || "",
        fields: new Map(),
        servicePath:
          modelOptions.servicePath || buildServiceName(moduleName, modelId),
      } as IModel;
    })();
    Symbols.mergeModel(model);
    Symbols.insertModelFields(modelId, fields);
  };
}

export function Field(meta: FieldOptions) {
  function processJoin(join: NullableOrUndef<JoinOptions>): JoinOptions | null {
    if (!join) {
      return null;
    }
    return join;
  }

  return (target: Object, key: string) => {
    var type = Reflect.getMetadata("design:type", target, key);
    let typeName = type.name;

    let field: Required<IField> = {
      id: key,
      label: meta.label || "",
      extended: false,
      editable: valueOrDefault(meta.editable, true),
      columnVisible: valueOrDefault(meta.columnVisible, true),
      jsType: toPrimitive(typeName),
      componentType: meta.componentType || inferComponentType(typeName),
      join: processJoin(meta.join),
      required: valueOrDefault(meta.required, true),
      columnIndex: valueOrDefault(meta.columnIndex, 9),
      columnMinWidth: valueOrDefault(meta.columnMinWidth, 120),
      columnOverflowTip: valueOrDefault(meta.columnOverflowTip, false),
      fieldSpan: valueOrDefault(meta.fieldSpan, 12),
    };

    let modelId = classNameOf(target.constructor);
    Symbols.upsertModelField(modelId, field);
  };
}
