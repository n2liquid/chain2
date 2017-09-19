let PLazy = require('p-lazy');

let tw = require('./tw');

module.exports = speaker => PLazy.from(() => {
  tw.speaker = speaker;
  tw.speechHeading = true;
});
