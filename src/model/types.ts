export interface JoinOptions {
  // 关联的模型类类名
  target: string;
  // 关联的字段
  field: string;
  condition: [string, string];
}

export interface IField {
  id?: string;
  // 显示名称
  display: string;
  // 是否可编辑
  editable?: boolean;
  join?: JoinOptions | null;
}

export interface IModel {
  id: string;
  table: string;
  fields: Map<string, IField>;
}
