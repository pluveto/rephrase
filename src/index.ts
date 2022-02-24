#!/usr/bin/env node

import { Symbols } from "./model/runtime";
import { replacer } from "./util/type";
import { Member, MemberWechat } from "./workspace/models";
import { genEntity as renderEntity } from "./workspace/templates/b_entity";
import { renderCurd } from "./workspace/templates/f_curd";

class Rephraser {
  rephraseName(_: Function) {
    return this;
  }
}



console.log(JSON.stringify(Symbols, replacer, 2));

let entityOutput = renderEntity(Member);
console.log(entityOutput);

let curdOutput = renderCurd(Member);
console.log(curdOutput);