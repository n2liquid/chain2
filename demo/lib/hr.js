let {
  storyAppend,
} = require('chain');

module.exports = () => {
  storyAppend(document.createElement('hr'));
};
