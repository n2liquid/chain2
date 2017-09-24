let PLazy = require('p-lazy');

let storyAppend = require('./storyAppend');

module.exports = () => new PLazy(resolve => {
  let el = document.createElement('span');

  el.classList.add('chainWaitCursor');

  storyAppend(el);

  document.addEventListener('keydown', ev => {
    if (ev.keyCode !== 13) {
      return;
    }

    el.remove();

    resolve();
  });
});
