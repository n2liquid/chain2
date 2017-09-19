let tw = require('./tw');

module.exports = async fn => {
  tw.speech = true;
  let ret = await fn();
  tw.speech = false;

  return ret;
};
