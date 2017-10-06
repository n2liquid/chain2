let defaultsDeep = require('lodash/defaultsDeep');

let {
  loadState,
} = require('chain');

let ctx = require('./ctx');
let lv = require('./lv');

document.addEventListener('DOMContentLoaded', () => {
  let st = loadState();

  if (st) {
    ctx.st = defaultsDeep(st, ctx.originalSt);
  }

  lv.title(ctx).catch(err => console.error(err));
});
