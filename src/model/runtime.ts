import { extendMap } from "../util/type";
import { IField, IModel } from "./types";

// Save model infomations
class SymbolTable {
  
  // == Properties ==

  ModelMap: Map<string, IModel>;

  // == Methods ==
  constructor() {
    this.ModelMap = new Map();
  }

  // -- model operations --
  // add model to the symbol table
  addModel(model: IModel) {
    if (this.ModelMap.has(model.id)) {
      console.info("model already exists: " + model.id);
      return;
    }
    this.ModelMap.set(model.id, model);
    console.debug(`add model: ${model.id}`);
  }

  // -- model's fields operations --
  // insert fields in front of the model fields
  insertModelFields(modelId: string, source: Map<string, IField>) {
    
    // 下面的方式会导致顺序上派生类的成员在父类之前:
    // let fields = this.getModelFields(modelId);
    // extendMap(fields, source);
    // 因此采用了下面比较复杂的方法，因为无法直接 insert map. 欢迎提供更好的想法。

    let fields = this.getModelFields(modelId);
    let tmp = new Map();
    source.forEach((value, key) => {
      tmp.set(key, value);
    });
    fields.forEach((value, key) => {
      tmp.set(key, value);
    });
    fields.clear();
    tmp.forEach((value, key) => {
      fields.set(key, value);
    });
  }

  getModelFields(modelId: string): Map<string, IField> {
    let model = this.ModelMap.get(modelId);
    if (!model) {
      throw new Error("model not found: " + modelId);
    }
    return model.fields;
  }

  upsertModelField(modelId: string, field: Required<IField>) {
    let model = this.ModelMap.get(modelId);
    if (!model) {
      // throw new Error("model not found: " + modelId);
      model = {
        id: modelId,
        table: "",
        fields: new Map(),
      };
      this.addModel(model);
    }
    model.fields.set(field.id, field);
  }
}

// Global symbol table

let symbolTable = new SymbolTable();

export { symbolTable as Symbols };
