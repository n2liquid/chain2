let PLazy = require('p-lazy');

let {
  storyAppend,
  str,
} = require('chain');

module.exports = async (...args) => PLazy.from(
  async () => {
    let el = document.createElement('div');

    el.classList.add('yggCentered', 'chainStoryTarget');
    storyAppend(el);

    let ret = await str(...args);

    el.classList.remove('chainStoryTarget');

    return ret;
  }
);
