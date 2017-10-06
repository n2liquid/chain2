let ctx = require('./ctx');
let gameLib = require('./lib');
let lv = require('./lv');

document.addEventListener('DOMContentLoaded', () => {
  gameLib.loadState(ctx);
  lv.title(ctx).catch(err => console.error(err));
});
