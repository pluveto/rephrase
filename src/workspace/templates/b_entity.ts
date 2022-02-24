import { classNameOf } from "../../util/type";
import chalk from "chalk";
import { t } from "../../util/template";

export function renderEntity(modelCtor: Function) {
  let modelId = classNameOf(modelCtor);
  let model = t.model(modelId);

  return `
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from '@cool-midway/core';
import { Column } from 'typeorm';

/**
 * ${model.label}
 */
@EntityModel('${model.table}')
export class ${model.module}${model.id}Entity extends BaseEntity {
${t
  .fields(modelId)
  .filter((f) => f.editable && !f.extended && !f.join)
  .map((field) => {
    return `
  @Column({ comment: '${field.label}' })
  ${field.id}: ${field.jsType};
  `;
  })
  .join("")}
}`;
}
