let lv = require('./levels');

document.addEventListener('DOMContentLoaded', () => {
  lv.fyrya().catch(err => console.error(err));
});
