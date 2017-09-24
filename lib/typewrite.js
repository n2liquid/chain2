let nextTick = require('./nextTick');
let tw = require('./tw');
let write = require('./write');

module.exports = async str => {
  let d = tw.delay;
  let t = Date.now();

  while (str.length) {
    let ff = tw.fastforward;

    let charCount =
      d && !ff ? Math.floor((Date.now() - t) / d) : str.length;

    if (!charCount) {
      await nextTick();
      continue;
    }

    let chars = str.slice(0, charCount);

    await write(chars);

    str = str.slice(charCount);
    t = Date.now();
  }
};
