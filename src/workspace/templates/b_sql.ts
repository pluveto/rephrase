import { snakeCase } from "change-case";
import { t } from "../../util/template";
import { classNameOf } from "../../util/type";

export function renderSQL(modelCtor: Function) {
  let model = t.model(classNameOf(modelCtor));
  let entityName = model.module + model.id + "Entity";
  let controllerName = model.module + "Admin" + model.id + "Controller";  
  let mysqlTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  return `
  INSERT INTO 'base_sys_menu'
  ('createTime',   'updateTime',   'parentId', 'name', 'router', 'perms', 'type', 'icon', 'orderNum', 'viewPath', 'keepAlive', 'isShow') VALUES
  ('${mysqlTime}', '${mysqlTime}',  NULL,      '${model.id}', '${model.id}', '${model.id}', '1', '', '0', '', '0', '1');
  INSERT INTO 'base_sys_menu'
  ('createTime',   'updateTime',   'parentId', 'name', 'router', 'perms', 'type', 'icon', 'orderNum', 'viewPath', 'keepAlive', 'isShow') VALUES
  ('${mysqlTime}', '${mysqlTime}',  27, '角色列表', '/sys/role', NULL, 1, 'icon-common', 3, 'cool/modules/base/views/role.vue', 1, 1),
  ('${mysqlTime}', '${mysqlTime}',  22, '新增', NULL, 'base:sys:role:add', 2, NULL, 1, NULL, 0, 1),
  ('${mysqlTime}', '${mysqlTime}',  22, '删除', NULL, 'base:sys:role:delete', 2, NULL, 2, NULL, 0, 1),
  ('${mysqlTime}', '${mysqlTime}',  22, '修改', NULL, 'base:sys:role:update', 2, NULL, 3, NULL, 0, 1),
  ('${mysqlTime}', '${mysqlTime}',  22, '查询', NULL, 'base:sys:role:page,base:sys:role:list,base:sys:role:info', 2, NULL, 4, NULL, 0, 1),
  `;
}
