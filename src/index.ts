#!/usr/bin/env node

import { Symbols } from "./model/runtime";
import { replacer } from "./util/type";
import { JlMember, JlMemberWechat } from "./workspace/sample";

class Rephraser {
  rephraseName(_: Function) {
    return this;
  }
}

new Rephraser()
  .rephraseName(JlMemberWechat) //
  .rephraseName(JlMember);

console.log(JSON.stringify(Symbols, replacer, 2));
