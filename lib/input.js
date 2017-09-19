let read = require('./cli-read');

module.exports = () => new Promise(resolve => {
  if (typeof window !== 'object') {
    resolve(read('> '));
    return;
  }
  else {
    let el = document.createElement('input');

    el.addEventListener('keyup', ev => {
      if (ev.keyCode !== 13) {
        return;
      }

      el.disabled = true;

      resolve(el.value);
    });

    document.body.appendChild(document.createTextNode('> '));
    document.body.appendChild(el);

    el.focus();
  }
});
