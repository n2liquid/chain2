let input = require('./input');
let ln = require('./ln');

module.exports = async choices => {
  let ret;

  let ks = Object.keys(choices).map(
    k => k.toLowerCase()
  );

  while (true) {
    let choice = (await input()).toLowerCase();

    if (ks.indexOf(choice) !== -1) {
      ret = await choices[choice]();
      break;
    }
  }

  return ret;
};
