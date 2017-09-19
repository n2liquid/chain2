let clear = require('clear');

module.exports = () => {
  if (typeof window !== 'object') {
    clear();
  }
  else {
    document.body.innerHTML = '';
  }
};
