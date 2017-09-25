let ln = require('./ln');
let read = require('./cli-read');
let storyAppend = require('./storyAppend');
let tw = require('./tw');

module.exports = () => new Promise(resolve => {
  tw.fastforward = false;

  if (typeof window !== 'object') {
    resolve(read('> '));
    return;
  }
  else {
    let el = document.createElement('input');

    el.addEventListener('keydown', async ev => {
      if (ev.keyCode !== 13) {
        return;
      }

      let v = el.value.trim();

      if (!v) {
        return;
      }

      el.disabled = true;

      await ln();
      await ln();

      resolve(v);
    });

    storyAppend(document.createTextNode('> '));
    storyAppend(el);

    el.focus();
  }
});
