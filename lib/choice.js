let input = require('./input');
let ln = require('./ln');

module.exports = async choices => {
  let regExps = Object.keys(choices).map(
    k => new RegExp(k.toLowerCase())
  );

  let vs = Object.values(choices);

  while (true) {
    let choice = (await input()).toLowerCase();

    let i = regExps.findIndex(re => re.test(choice));

    if (i !== -1) {
      return vs[i]();
    }
  }
};
