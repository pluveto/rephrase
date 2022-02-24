export interface JoinOptions {
  // 关联的模型类类名
  target: string;
  // 关联的字段
  field: string;
  condition: [string, string];
}

export type componentType = "input" | "textarea" | "integer" | "avatar";

export type FieldOptions = Partial<IField>;

export interface IField {
  id: string;
  label: string;
  extended: boolean;
  required: boolean;
  editable: boolean;
  jsType: string;
  componentType: componentType;
  columnIndex: any;
  columnVisible: boolean;
  columnMinWidth: number;
  fieldSpan: number;
  join?: JoinOptions | null;
}

export type ModelOptions = Partial<IModel>;

export interface IModel {
  id: string;
  table: string;
  extends: string;
  display: string;
  fields: Map<string, IField>;
}
