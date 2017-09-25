let {
  loadState,
} = require('chain');

let ctx = require('./context');
let lv = require('./levels');

document.addEventListener('DOMContentLoaded', () => {
  let st = loadState();

  if (st) {
    ctx.st = st;
  }

  lv.title(ctx).catch(err => console.error(err));
});
