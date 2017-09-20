let PLazy = require('p-lazy');

let storyAppend = require('./storyAppend');

module.exports = str => new PLazy(resolve => {
  if (typeof window !== 'object') {
    process.stdin.write(str);
    resolve();
  }
  else {
    for (let i = 0; i < str.length; ++i) {
      let c = str[i];

      if (c !== '\n') {
        c = document.createTextNode(c);
      }
      else {
        c = document.createElement('br');
      }

      storyAppend(c);
    }

    setTimeout(resolve, 0);
  }
});
