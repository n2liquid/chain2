let {
  ln,
} = require('chain');

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
  await ln();

  let hit = Math.round(Math.random() * 2) + 1;

  await ln(`${bLabel} loses ${hit} HP.<w>`);

  b.hp = Math.max(0, b.hp - hit);

  if (!b.hp) {
    b.active = false;
    await ln(`${bLabel} is no more.<w>`);
  }

  await ln();
};
