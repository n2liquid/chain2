let {
  choice,
  clr,
  input,
  ln,
  runFlow,
  saveState,
  sdl,
  sec,
  speech,
  sspk,
} = require('chain');

let {
  encounter,
  heading,
  hr,
} = require('../lib');

module.exports = ctx => runFlow({
  EV1000: async () => {
    await clr();

    ctx.st.levelId = 'fyryaDungeon1F';
    saveState(ctx.st);

    await heading(`Fyrya Dungeon 1F`);
    await ln();
    await sdl(30);

    if (!ctx.st.fyryaDungeon1F.firstTime) {
      //return 'EV2000';
    }
  },

  EV1500: async () => {
    await ln(`You hear something nasty coming from behind. It's a`);
    await ln(`slime!<w>`);
    await ln();

    let battleResult = await encounter(ctx, {
      foeGroup: 1000,
      ambushType: 'partyUnprepared',
    });

    if (battleResult !== 'defeat') {
      return ['breakFlow', 'backToTitle'];
    }

    ctx.st.fyryaDungeon1F.firstTime = false;
    saveState(ctx.st);
  },
});
