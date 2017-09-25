let $$ = document.querySelectorAll.bind(document);

module.exports = (...nodes) => {
  let targets = $$('.chainStoryTarget');
  let target = targets[targets.length - 1];

  if (!target) {
    throw new Error(`No chainStoryTarget element found`);
  }

  return target.append(...nodes);
};

(function autoScroll() {
  requestAnimationFrame(autoScroll);

  let targets = $$('.chainStoryTarget');
  let target = targets[targets.length - 1];

  target.scrollTop = target.scrollHeight;
})();
