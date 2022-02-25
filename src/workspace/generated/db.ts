import chalk from "chalk";
import "reflect-metadata";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  QueryResult,
} from "typeorm";
import { dbOptions } from "../config";

let conn: Connection | null = null;

createConnection({
  entities: [],
  synchronize: true,
  logging: false,
  ...(dbOptions as ConnectionOptions),
})
  .then(async (_conn) => {
    conn = _conn;
    let runner = _conn.createQueryRunner();
    const r: any = await runner.query(
      "SELECT id, name FROM base_sys_menu WHERE router = '/jl'"
    );
    if (!r || !r.length) {
      console.error(chalk.red("module not exist, create it first"));
      return;
    }

    const [moduleId, moduleLabel] = [r[0].id, r[0].name];
    console.info("module label: " + moduleLabel + ", id: " + moduleId);
    const viewPath = "cool/modules/base/views/user.vue";

    await runner.query(
      "INSERT INTO base_sys_menu" +
        "(parentId, name,    router,   perms, type, orderNum, viewPath, keepAlive, isShow) VALUES" +
        '( ?,"用户", "/sys/user",   NULL,    1,      0, "cool/modules/base/views/user.vue", 1, 1)',
      [moduleId]
    );
    const r2 = await runner.query("SELECT LAST_INSERT_ID() as id");
    console.log(r2[0].id);

    return;
  })
  .catch((error) => console.log(error))
  .finally(() => {
    conn?.close();
  });
