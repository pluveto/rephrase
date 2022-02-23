/**
 * 模型基类
 */
export class BaseEntity {
  @Field({ display: "ID" })
  id: number;
  @Field({ display: "创建时间" })
  createTime: Date;
  @Field({ display: "修改时间" })
  updateTime: Date;
}

export interface TableMeta {
  name: string;
}

export function Table(meta: TableMeta) {
  return function (constructor: Function) {
    constructor.prototype.__table__ = meta;
  };
}

export interface FieldMeta {
  display: string;
}

export function Field(meta: FieldMeta) {
  return (targetObject: Object, propertyKey: string) => {
    if (
      typeof targetObject.constructor.prototype["__fields__"] === "undefined"
    ) {
      targetObject.constructor.prototype["__fields__"] = [];
    }
    console.log(` targetObject.constructor.prototype["__fields__"]`, targetObject.constructor.prototype["__fields__"]);
    
    let _tmp = {
        'id': propertyKey,
        ...meta
    }
    console.log("tmp",_tmp);
    
    targetObject.constructor.prototype["__fields__"].push(_tmp);
  };
}
