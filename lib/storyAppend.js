let $$ = document.querySelectorAll.bind(document);

module.exports = (...nodes) => {
  let targets = $$('.chainStoryTarget');
  let target = targets[targets.length - 1];

  if (!target) {
    throw new Error(`No chainStoryTarget element found`);
  }

  let ret = target.append(...nodes);

  target.scrollTop = target.scrollHeight;

  return ret;
};
