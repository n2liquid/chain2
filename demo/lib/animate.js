let $ = document.querySelector.bind(document);

module.exports = (el, anim) => {
  if (typeof el === 'string') {
    el = $(el);
  }

  el.classList.add('animated', anim);

  return new Promise(resolve => {
    el.addEventListener('animationend', function fn(ev) {
      if (ev.animationName !== anim) {
        return;
      }

      el.removeEventListener(ev.type, fn);
      el.classList.remove(anim);

      resolve();
    });
  });
};
