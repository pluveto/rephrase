import chalk from "chalk";
import { t } from "../../util/template";
import { classNameOf } from "../../util/type";
import {
  renderColumn,
  renderComponent,
  renderFieldRule,
} from "../util/component";

export function renderCurd(f: Function) {
  let modelId = classNameOf(f);
  let model = t.model(modelId);
  let fields = t.fields(modelId);

  console.log(chalk.green(`generating curd of : ${modelId}`));
  return `
<template>
	<cl-crud @load="onLoad">
		<el-row type="flex">
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key />
		</el-row>

		<el-row>
			<cl-table v-bind="table" />
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<cl-pagination />
		</el-row>

		<cl-upsert v-model="form" v-bind="upsert" />
	</cl-crud>
</template>

<script lang="ts">
import { CrudLoad, Table, Upsert } from "@cool-vue/crud/types";
import { defineComponent, reactive } from "vue";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "member",

	setup() {
		const { service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			dialog: {
				width: "800px"
			},
			items: [
			${fields
        .filter((f) => f.editable && !f.extended && !f.join)
        .map((f) => {
          return `
				{
					prop: "${f.id}",
					label: "${f.label}",
					span: ${f.fieldSpan || 20},
					component: ${renderComponent(f)})},
					rules: ${renderFieldRule(f)}
				},
		`;
        })
        .join(",")}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			props: {
				"default-sort": {
					prop: "createTime",
					order: "descending"
				}
			},
			columns: [
				{
					type: "selection",
					width: 60
				},
				${fields
          .filter((f) => !f.extended && !f.join)
          .sort((a, b) => a.columnIndex - b.columnIndex)
          .map((f) => renderColumn(f))
          .join(",")}
				{
					label: "操作",
					type: "op"
				}
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			ctx.service(service.${model.servicePath}).done();
			app.refresh();
		}

		return {
			form,
			upsert,
			table,
			onLoad
		};
	}
});
</script>
`;
}
