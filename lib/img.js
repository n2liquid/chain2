let PLazy = require('p-lazy');

module.exports = src => new PLazy(resolve => {
  if (typeof window !== 'object') {
    return;
  }

  let img = document.createElement('img');

  img.onerror = err => {
    console.error(err);
    resolve();
  };

  img.onload = resolve;

  img.src = src;

  document.body.appendChild(img);
});
