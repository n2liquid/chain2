let {
  choice,
  clr,
  ln,
  runFlow,
  saveState,
  sdl,
} = require('chain');

let {
  heading,
} = require('../lib');

let lv = require('.');

let newGame = async ctx => {
  ctx.st = ctx.originalSt;
  ctx.st.gameStarted = true;

  saveState(ctx.st);

  await ln(`<sdl:10>Game start!<w>`);
  await ln();

  await lv.fyrya(ctx);
};

module.exports = ctx => runFlow({
  title: async () => {
    while (true) {
      await clr();

      await heading(`Yggdrasil Dungeon`);
      await ln();

      await sdl(30);

      await ln(`- New Game`);

      if (!ctx.st.gameStarted) {
        await ln();

        return choice({
          new: async () => {
            await newGame(ctx);
          },
        });
      }
      else {
        await ln(`- Load Game`);
        await ln();

        await choice({
          new: async () => {
            await ln(`Are you sure you want to restart the game?<sec:0.5>`);
            await ln(`Doing so will destroy the currently saved adventure.`);
            await ln();

            await ln(`- Yes`);
            await ln(`- No`);
            await ln();

            return choice({
              yes: async () => {
                await newGame(ctx);
              },

              no: () => 'title',
            });
          },

          load: async () => {
            await ln(`<sdl:10>Game loaded!<w>`);
            await ln();

            await lv[ctx.st.levelId](ctx);
          },
        });
      }
    }
  },
});
