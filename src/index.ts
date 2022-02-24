#!/usr/bin/env node

import { Symbols } from "./model/runtime";
import { replacer } from "./util/type";
import { Member } from "./workspace/models";

console.log(JSON.stringify(Symbols, replacer, 2));

import { cw } from "./workspace/util/code_writer";

cw.outputFrontCurd(Member).outputBackEntity(Member);
