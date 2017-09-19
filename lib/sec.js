let PLazy = require('p-lazy');

module.exports = s => new PLazy(resolve => {
  setTimeout(resolve, s * 1000);
});
