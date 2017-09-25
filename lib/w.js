let PLazy = require('p-lazy');

let nextTick = require('./nextTick');
let storyAppend = require('./storyAppend');
let tw = require('./tw');

let $ = document.querySelector.bind(document);

module.exports = () => PLazy.from(async () => {
  if (tw.fastforward) {
    tw.fastforward = false;
  }

  let el = document.createElement('span');

  el.classList.add('chainWaitCursor');

  storyAppend(el);

  while ($('.chainWaitCursor')) {
    await nextTick();
  }
});

let advance = () => {
  let inputEl = $('.chainStoryTarget input:not([disabled])');

  if (inputEl) {
    inputEl.focus();
    return;
  }

  let cursorEl = $('.chainWaitCursor');

  if (cursorEl) {
    cursorEl.remove();
  }
  else {
    tw.fastforward = true;
  }
};

document.addEventListener('click', () => advance());

document.addEventListener('keydown', ev => {
  if (ev.keyCode !== 13) {
    return;
  }

  if (ev.target.tagName === 'INPUT') {
    return;
  }

  console.log('w ENTER');

  advance();
});
