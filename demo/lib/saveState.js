module.exports = ctx => {
  localStorage.setItem('yggGameState', JSON.stringify(ctx.st));
};
