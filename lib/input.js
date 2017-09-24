let ln = require('./ln');
let read = require('./cli-read');
let storyAppend = require('./storyAppend');

module.exports = () => new Promise(resolve => {
  if (typeof window !== 'object') {
    resolve(read('> '));
    return;
  }
  else {
    let el = document.createElement('input');

    el.addEventListener('keyup', async ev => {
      if (ev.keyCode !== 13) {
        return;
      }

      el.disabled = true;

      await ln();
      await ln();

      resolve(el.value);
    });

    storyAppend(document.createTextNode('> '));
    storyAppend(el);

    el.focus();
  }
});
