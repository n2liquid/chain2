let clear = require('clear');

let $$ = document.querySelectorAll.bind(document);

module.exports = () => {
  if (typeof window !== 'object') {
    clear();
  }
  else {
    let targets = $$('.chainStoryTarget');
    let target = targets[targets.length - 1];

    if (!target) {
      return;
    }

    target.innerHTML = '';
  }
};
