let str = require('./str');
let tw = require('./tw');
let write = require('./write');

module.exports = async (...args) => {
  if (tw.speech) {
    let speakerHeading = `  ${tw.speaker}: `;

    if (tw.speechHeading) {
      await write(speakerHeading);
      tw.speechHeading = false;
    }
    else {
      await write(
        new Array(speakerHeading.length + 1).join(' ')
      );
    }
  }

  await str(...args);
  await write('\n');
};
