let modTest = require('./test');

document.addEventListener('DOMContentLoaded', () => {
  modTest().catch(err => console.error(err));
});
