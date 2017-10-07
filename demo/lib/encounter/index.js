// TODO: Calculate real hit points.
// TODO: Calculate and award real EXP.
// TODO: Generate and award real drops.
// TODO: Implement item usage.
// TODO: Implement guarding.
// TODO: Implement fleeing.

let cloneDeep = require('lodash/cloneDeep');

let {
  choice,
  clr,
  input,
  ln,
  sdl,
  sec,
} = require('chain');

let centered = require('../centered');

let attack = require('./attack');

module.exports = async (ctx, opt) => {
  let btst = {};

  btst.turns = ['party', 'foes'];

  switch (opt.ambushType) {
    case 'partyUnprepared':
      btst.turns.reverse();
      await ln(`You've been caught unprepared.<w>`);
      break;
  }

  if (btst.turns[0] === 'party') {
    await ln(`You have the advantage.<w>`);
  }
  else {
    await ln(`The enemy has the advantage.<w>`);
  }

  await clr();
  await sec(1);

  btst.entities = {};

  let foeGroup = ctx.foeGroups[opt.foeGroup];

  let foes = foeGroup.foes.map(x => Object.assign({},
    ctx.foes[x.id],
    x
  ));

  for (let [i, x] of foes.entries()) {
    btst.entities[`F${i + 1 }`] = x;
  }

  let { party } = ctx.st;

  for (let [i, x] of party.entries()) {
    btst.entities[`P${i + 1 }`] = x;
  }

  await sdl(10);

  let printStatus = async () => {
    await sdl(0);

    for (let [i, x] of foes.entries()) {
      x.active && await ln(
        `  ${x.name}[F${i + 1}]: ` +
        `${x.hp}/${x.maxHp} HP, ${x.mp}/${x.maxMp} MP`
      );
    }

    await ln();

    for (let [i, x] of party.entries()) {
      x.active && await ln(
        `  ${x.name}[P${i + 1}]: ` +
        `${x.hp}/${x.maxHp} HP, ${x.mp}/${x.maxMp} MP`
      );
    }

    await ln();
  };

  while (true) {
    let playHandlers = {
      party: async id => {
        let x = btst.entities[id];

        while (true) {
          await printStatus();
          await sdl(10);

          await ln(`- Attack`);
          await ln(`- Guard`);
          await ln(`- Item`);
          await ln(`- Flee`);
          await ln();

          let next = await choice({
            attack: async () => {
              await ln(`Whom?`);
              await ln();

              let targetId = await (async () => {
                while (true) {
                  let x = (await input()).toUpperCase();

                  if (x.toLowerCase() === 'back') {
                    return;
                  }

                  let y = btst.entities[x];

                  if (!y || !y.active) {
                    continue;
                  }

                  return x;
                }
              })();

              if (!targetId) {
                return;
              }

              await attack(btst, id, targetId);

              return 'break';
            },
          });

          if (next === 'break') {
            break;
          }
        }
      },

      foes: async id => {
        await attack(btst, id, 'P1');
      },
    };

    for (let x of btst.turns) {
      await clr();

      if (x === 'foes') {
        await centered(`<sdl:0>=== Enemy turn ===`);
        await ln();

        await printStatus();
      }
      else {
        await centered(`<sdl:0>=== Party turn ===`);
        await ln();
      }

      await sdl(10);

      let ys = { party, foes }[x];

      for (let [i, y] of ys.entries()) {
        if (!y.active) {
          continue;
        }

        let prefix = { party: 'P', foes: 'F' }[x];

        await playHandlers[x](`${prefix}${i + 1}`);
      }
    }

    if (party.every(x => !x.active)) {
      await ln(`The party has fallen.<w>`);
      await clr();
      await sec(1);

      return 'defeat';
    }

    if (foes.every(x => !x.active)) {
      await ln(`Elmina got 10 EXP.<w>`);
      await ln(`Elmina got 3 GP.<w>`);
      await clr();
      await sec(1);

      return 'victory';
    }
  }
};
