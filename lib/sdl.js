let PLazy = require('p-lazy');

let tw = require('./tw');

module.exports = d => new PLazy(resolve => {
  tw.delay = d;
  resolve();
});
