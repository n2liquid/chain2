let {
  ln,
} = require('chain');

let animate = require('../animate');

let $ = document.querySelector.bind(document);

module.exports = async (btst, aId, bId) => {
  let a = btst.entities[aId];
  let b = btst.entities[bId];

  let aLabel = a.name;
  let bLabel = b.name;

  if (aId[0] !== 'P') {
    aLabel += `[${aId}]`;
  }

  if (bId[0] !== 'P') {
    bLabel += `[${bId}]`;
  }

  await ln(`${aLabel} attacks!<w>`);

  if (Math.random() >= 0.95) {
    await ln(`The attack misses ${bLabel}!<w>`);
    await ln();

    return;
  }

  if (Math.random() >= 0.95) {
    await ln(`${bLabel} evades the attack!<w>`);
    await ln();

    return;
  }

  let dmg = a.atk * 4 - b.def * 2;
  let variance = 0.2;

  dmg += (Math.random() * variance * 2 - variance) * dmg;

  dmg = Math.round(dmg);

  animate($('.storyArea'), 'shake');
  await ln(`${bLabel} loses ${dmg} HP.<w>`);

  b.hp = Math.max(0, b.hp - dmg);

  if (!b.hp) {
    b.active = false;

    await ln(`${bLabel} is no more.<w>`);
  }

  await ln();
};
