// TODO: Implement attack and guard skills.
// TODO: Generate and award real drops.
// TODO: Implement item usage.
// TODO: Implement fleeing.
// TODO: Implement other hero / enemy attributes (MATK,
// MDEF, AGI, LUCK).

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

  btst.foes = foeGroup.foes.map(x => Object.assign({},
    ctx.foes[x.id],
    x
  ));

  for (let [i, x] of btst.foes.entries()) {
    btst.entities[`F${i + 1 }`] = x;
  }

  btst.party = ctx.st.party;

  for (let [i, x] of btst.party.entries()) {
    btst.entities[`P${i + 1 }`] = x;
  }

  await sdl(10);

  let printStatus = async () => {
    await sdl(0);

    for (let [i, x] of btst.foes.entries()) {
      x.active && await ln(
        `  ${x.name}[F${i + 1}]: ` +
        `${x.hp}/${x.maxHp} HP, ${x.mp}/${x.maxMp} MP`
      );
    }

    await ln();

    for (let [i, x] of btst.party.entries()) {
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
        if (!btst.entities.P1.active) {
          return;
        }

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

      let ys = btst[x];

      for (let [i, y] of ys.entries()) {
        if (!y.active) {
          continue;
        }

        let prefix = { party: 'P', foes: 'F' }[x];

        await playHandlers[x](`${prefix}${i + 1}`);
      }
    }

    if (btst.party.every(x => !x.active)) {
      await ln(`The party has fallen.<w>`);
      await clr();
      await sec(1);

      return 'defeat';
    }

    if (btst.foes.every(x => !x.active)) {
      let killedFoes = btst.foes.filter(x => x.killed);

      let gpReward = killedFoes.reduce(
        (acc, x) => acc + x.gp, 0
      );

      ctx.st.gp += gpReward;

      await ln(`Got ${gpReward} GP.<w>`);

      let expReward = killedFoes.reduce(
        (acc, x) => acc + x.exp, 0
      );

      await ln(`Got ${expReward} EXP.<w>`);

      for (let x of btst.party) {
        if (!x.active) {
          continue;
        }

        x.exp += expReward;

        while (x.exp >= x.nextLvExp) {
          x.nextLvExp *= 2;
          ++x.lv;

          await ln(`${x.name} level up! (LV. ${x.lv})<w>`);
        }
      }

      await clr();
      await sec(1);

      return 'victory';
    }
  }
};
