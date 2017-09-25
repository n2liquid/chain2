let typewrite = require('./typewrite');

let validInlineCmds = {
  sdl: require('./sdl'),
  sec: require('./sec'),
  w: require('./w'),
};

let reStr = /<[^>]+>/;

function parseString(str) {
  let ret = [];
  let m;

  while (true) {
    m = reStr.exec(str);

    if (!m) {
      break;
    }

    let [name, args] = m[0].slice(1, -1).split(':');

    if (!args) {
      args = [];
    }
    else {
      args = args.split(',').map(x => {
        try {
          return JSON.parse(x);
        }
        catch (err) {}

        return x;
      });
    }

    let [before, after] = str.split(reStr, 2);

    if (before) {
      ret.push(before);
    }

    ret.push(validInlineCmds[name](...args));

    if (after) {
      ret.push(after);
    }

    str = str.replace(`${before || ''}${m[0]}${after || ''}`, '');
  }

  if (str) {
    ret.push(str);
  }

  return ret;
}

module.exports = async (...args) => {
  while (args.length) {
    let arg = args.shift();

    if (arg && arg.then) {
      arg = await Promise.resolve(arg);
    }

    if (typeof arg === 'function') {
      arg = await Promise.resolve(arg());
    }

    if (typeof arg === 'string') {
      let parsed = parseString(arg);

      if (
        parsed.length >= 2 ||
        typeof parsed[0] !== 'string'
      ) {
        args.unshift(...parsed);
        continue;
      }

      await typewrite(parsed[0]);
    }
  }
};
