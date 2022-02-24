import { snakeCase } from "change-case";
import { Symbols } from "../../model/runtime";
import { IModel } from "../../model/types";
import { classNameOf } from "../../util/type";
import { mustGetEnv } from "../config";
import { renderCurd } from "../templates/f_curd";
import fs from "fs";
import { renderEntity } from "../templates/b_entity";
import chalk from "chalk";

export class CodeWriter {
  // == Properties ==
  frontendRootDir: string = mustGetEnv("FRONTEND_ROOT_DIR");
  backendRootDir: string = mustGetEnv("BACKEND_ROOT_DIR");

  // == Methods ==
  outputFrontCurd(modelCtor: Function): this {
    let model = Symbols.getModel(classNameOf(modelCtor));
    let outputPath =
      `${this.frontendRootDir}/src/cool/modules/` +
      `${snakeCase(model.module)}/views/${snakeCase(model.id)}.vue`;
    this.output(modelCtor, outputPath, renderCurd);
    return this;
  }

  outputBackEntity(modelCtor: Function): this {
    let model = Symbols.getModel(classNameOf(modelCtor));
    let outputPath =
      `${this.backendRootDir}/src/app/modules/` +
      `${snakeCase(model.module)}/entity/${snakeCase(model.id)}.ts`;
    this.output(modelCtor, outputPath, renderEntity);
    return this;
  }

  output(
    modelCtor: Function,
    outputPath: string,
    renderer: (modelCtor: Function) => string
  ) {
    function preventWrite(path: string): boolean {
      let size = fs.statSync(path).size;
      // 10KB
      if (size > 10 * 1024) {
        console.log(chalk.yellow(`[SKIP] ${path} is too large to write`));
        return true;
      }
      let content = fs.readFileSync(path, "utf8");
      if (content.indexOf("~NO REPHREASE~") !== -1) {
        console.log(chalk.yellow(`[SKIP] ${path} don't want to be rephreased`));
        return true;
      }
      return false;
    }

    console.log(
      chalk.yellow(`Process ${renderer.name} for ${classNameOf(modelCtor)}`)
    );

    if (fs.statSync(outputPath).isFile()) {
      if (preventWrite(outputPath)) {
        // console.warn(chalk.dim("skip write: " + outputPath));
        return;
      }
    }
    fs.writeFileSync(outputPath, renderer(modelCtor));
    console.info(chalk.green(`[OK] ${outputPath}`));
  }
}

export const cw = new CodeWriter();
