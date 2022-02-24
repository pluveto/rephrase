export interface JoinOptions {
  // 关联的模型类类名
  target: string;
  // 关联的字段
  field: string;
  condition: [string, string];
}

export type componentType = "input" | "textarea" | "integer" | "avatar" | "switch";

export type FieldOptions = Partial<IField>;

export interface IField {
  // 字段标识符
  id: string;
  // 字段名称
  label: string;
  // 是否是继承的字段
  extended: boolean;
  // 是否必填
  required: boolean;
  // 是否可编辑
  editable: boolean;
  // 字段的 Javascript 类型
  jsType: string;
  // 字段的组件类型
  componentType: componentType;
  // 字段的列表顺序
  columnIndex: number;
  // 是否在列表可见
  columnVisible: boolean;
  // 最小列宽
  columnMinWidth: number;
  // 列表溢出时在提示文字显示
  columnOverflowTip: boolean;
  // 在表单中占用的栅格数
  fieldSpan: number;
  // 外键连接
  join?: JoinOptions | null;
}

export type ModelOptions = Partial<IModel>;

export interface IModel {
  // 模型标识符，例如：User
  id: string;
  // 模型所属模块，例如：App
  module: string;
  // 模型所属表名，例如：app_user
  table: string;
  // 继承的模型，例如：BaseEntity
  extends: string;
  // 模型的显示名称，例如：用户
  label: string;
  // 模型的字段集合
  fields: Map<string, IField>;
  // 模型的 service 路径（js），例如：app.user
  servicePath: string;
}
