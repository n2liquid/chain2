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
  if ($('.chainStoryTarget input:not([disabled])')) {
    return;
  }

  let el = $('.chainWaitCursor');

  if (el) {
    el.remove();
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

  advance();
});
