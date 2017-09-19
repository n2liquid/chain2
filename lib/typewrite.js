let sec = require('./sec');
let tw = require('./tw');
let write = require('./write');

module.exports = async str => {
  let d = tw.delay;
  let t = Date.now();

  while (str.length) {
    let charCount =
      d ? Math.floor((Date.now() - t) / d) : str.length;

    if (!charCount) {
      await sec(0);
      continue;
    }

    let chars = str.slice(0, charCount);

    await write(chars);

    str = str.slice(charCount);
    t = Date.now();
  }
};
