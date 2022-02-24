import { componentType, IField } from "../../model/types";

export function renderComponent(f: IField): string {
  let props = {
    placeholder: "请填写" + f.label,
  } as any;
  let name: string = ((_props) => {
    switch (f.componentType) {
      case "input":
        return "el-input";

      case "textarea":
        props = {
          ...props,
          type: "textarea",
          rows: 4,
        };
        return "el-input";

      case "integer":
        return "el-number";

      case "avatar":
        throw new Error("avatar not yet supported");
    }
  })(props);
  return `{
    name: "${name}",
    props: ${JSON.stringify(props, null, 2)}
  }`;
}

export function renderFieldRule(f: IField): string {
  if (!f.required) {
    return "{}";
  }

  return `{
    required: ${f.required},
    message: "${f.label}不能为空"
  }`;
}

export function renderColumn(f: IField): string {
  let defaultColumnMinWidth = 120;
  if (f.jsType === "Date") {
    defaultColumnMinWidth = 150;
  }
  let column = {
    prop: f.id,
    label: f.label,
    minWidth: f.columnMinWidth || defaultColumnMinWidth,
    ...(() => {
      if (f.jsType == "Date") {
        return { sortable: "custom" };
      }
    })(),
  };
  return JSON.stringify(column, null, 2);
}
