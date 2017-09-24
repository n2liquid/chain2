let PLazy = require('p-lazy');

let nextTick = require('./nextTick');
let tw = require('./tw');

module.exports = s => PLazy.from(async () => {
  let d = Date.now();

  while (true) {
    if (tw.fastforward) {
      break;
    }

    if (Date.now() - d >= s * 1000) {
      break;
    }

    await nextTick();
  }
});
