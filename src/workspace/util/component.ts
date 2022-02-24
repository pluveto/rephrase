import { componentType, IField } from "../../model/types";

export function renderFormComponent(f: IField): string {
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

      case "switch":
        return "el-switch";

      case "avatar":
        props = {
          ...props,
          text: "选择头像",
          icon: "el-icon-picture",
        };
        return "cl-upload";
    }
  })(props);
  return `{
    name: "${name}",
    props: ${JSON.stringify(props)}
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
      let ret = {} as any;
      if (f.jsType == "Date") {
        ret.sortable = "custom";
      }
      if (f.columnOverflowTip) {
        ret.showOverflowTooltip = true;
      }
      return ret;
    })(),
  };
  return JSON.stringify(column, null, "\t");
}
