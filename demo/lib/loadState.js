let defaultsDeep = require('lodash/defaultsDeep');

module.exports = ctx => {
  let st = localStorage.getItem('yggGameState');

  if (!st) {
    return ctx.st;
  }

  ctx.st = defaultsDeep(JSON.parse(st), ctx.originalSt);

  return ctx.st;
};
