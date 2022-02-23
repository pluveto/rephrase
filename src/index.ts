#!/usr/bin/env node

import { JlMember } from "./workspace/sample";

function rephrase(t: Function) {
  let fields = t.prototype["__fields__"];
  let table = t.prototype["__table__"];

  console.log("rephrase out:", {
    table,
    fields,
  });
}

rephrase(JlMember);
