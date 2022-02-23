import { Field } from ".";

/**
 * 模型基类
 */
export class BaseEntity {
  @Field({ display: "ID", editable: false })
  id: number;
  @Field({ display: "创建时间", editable: false })
  createTime: Date;
  @Field({ display: "修改时间", editable: false })
  updateTime: Date;
}

export interface TableOptions {
  name: string;
}
