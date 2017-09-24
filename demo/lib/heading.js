let PLazy = require('p-lazy');

let {
  storyAppend,
  str,
} = require('chain');

module.exports = async (...args) => PLazy.from(
  async () => {
    let el = document.createElement('div');

    el.classList.add('yggHeading', 'chainStoryTarget');
    storyAppend(el);

    let ret = await str(
      '<sdl:150><sec:1>', ...args, '<sec:2>'
    );

    el.classList.remove('chainStoryTarget');

    return ret;
  }
);
