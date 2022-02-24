#!/usr/bin/env node

import { Symbols } from "./model/runtime";
import { replacer } from "./util/type";
import { JlMember, JlMemberWechat } from "./workspace/models";
import { genEntity } from "./workspace/templates/b_entity";

class Rephraser {
  rephraseName(_: Function) {
    return this;
  }
}

let entityOutput = genEntity(JlMember);


console.log(JSON.stringify(Symbols, replacer, 2));

console.log(entityOutput);