let cloneDeep = require('lodash/cloneDeep');

let {
  choice,
  clr,
  input,
  ln,
  sdl,
  sec,
} = require('chain');

let centered = require('./centered');

module.exports = async (ctx, opt) => {
  //let foeGroup = ctx.foeGroups[opt.foeGroup];

  let foeGroup = { foes: [
    { name: 'Slime', active: true, hp: 2, maxHp: 10, mp: 0, maxMp: 0 },
    { name: 'Slime', active: true, hp: 2, maxHp: 10, mp: 0, maxMp: 0 },
  ]};

  let foes = foeGroup.foes.map(x => cloneDeep(x));

  //let { party } = ctx.st;

  let party = [
    { name: 'Elmina', active: true, hp: 60, maxHp: 60, mp: 10, maxMp: 10 },
  ];

  let turns = ['party', 'foes'];

  await clr();
  await sec(1);
  await sdl(10);

  switch (opt.ambushType) {
    case 'partyUnprepared':
      turns.reverse();
      await ln(`You've been caught unprepared.<w>`);
      break;
  }

  if (turns[0] === 'party') {
    await ln(`You have the advantage.<w>`);
  }
  else {
    await ln(`The enemy has the advantage.<w>`);
  }

  await clr();
  await sec(1);

  let printStatus = async () => {
    await sdl(0);

    for (let [i, x] of foes.entries()) {
      x.active && await ln(
        `  ${x.name}[E${i + 1}]: ${x.hp}/${x.maxHp} HP, ${x.mp}/${x.maxMp} MP`
      );
    }

    await ln();

    for (let [i, x] of party.entries()) {
      x.active && await ln(
        `  ${x.name}[P${i + 1}]: ${x.hp}/${x.maxHp} HP, ${x.mp}/${x.maxMp} MP`
      );
    }

    await ln();
  };

  while (true) {
    let playHandlers = {
      party: async x => {
        while (true) {
          await printStatus();
          await sdl(10);

          await ln(`- Attack`);
          await ln(`- Guard`);
          await ln(`- Item`);
          await ln(`- Run`);
          await ln();

          let done = await choice({
            attack: async () => {
              await ln(`Whom?`);
              await ln();

              let [target, id] = await (async () => {
                while (true) {
                  let x = (await input()).toUpperCase();

                  if (x.toLowerCase() === 'back') {
                    return [];
                  }

                  let targetType = x[0];
                  let targetNum = Number(x.slice(1));

                  let targets =
                    { E: foes, P: party }[targetType];

                  if (!targets) {
                    continue;
                  }

                  let target = targets.find((x, i) =>
                    x.active && i === targetNum - 1
                  );

                  if (!target) {
                    continue;
                  }

                  return [target, x];
                }
              })();

              if (!target) {
                return false;
              }

              await ln(`${x.name} attacks!<w>`);
              await ln();

              let targetLabel = `${target.name}[${id}]`;
              let hit = Math.round(Math.random() * 2) + 1;

              await ln(
                `${targetLabel} loses ${hit} HP.<w>`
              );

              target.hp = Math.max(0, target.hp - hit);

              if (!target.hp) {
                target.active = false;
                await ln(`${targetLabel} is no more.<w>`);
              }

              await ln();
            },
          });

          if (done !== false) {
            break;
          }
        }
      },

      foes: async (x, i) => {
        await ln(`${x.name}[E${i + 1}] struggles.<w>`);
        await ln();
      },
    };

    for (let x of turns) {
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

        await playHandlers[x](y, i);
      }
    }

    if (party.every(x => !x.active)) {
      await ln(`The party has fallen.<w>`);
      await clr();
      await sec(1);

      return 'defeat';
    }

    if (foes.every(x => !x.active)) {
      await ln(`Elmina shakes rests of slime off from her blade.<w>`);
      await ln();

      await ln(`Elmina got 10 EXP.<w>`);
      await ln(`Elmina got 3 GP.<w>`);
      await clr();
      await sec(1);

      return 'victory';
    }
  }
};
