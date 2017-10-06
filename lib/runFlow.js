module.exports = async flow => {
  let ks = Object.keys(flow);
  let kNext = ks[0];

  while(kNext && kNext !== -1) {
    let ret = await flow[kNext]();
    let rest = [];

    if (Array.isArray(ret)) {
      [ret, ...rest] = ret;
    }

    if (ret === 'breakFlow') {
      console.log('flow broken');
      return rest.length >= 2 ? rest : rest[0];
    }

    kNext = ret || ks[ks.indexOf(kNext) + 1];

    if (!kNext || kNext === -1) {
      console.log('kNext:', kNext);
      console.log('ret:', ret);
      console.log('rest:', rest);
      console.log('flow:', flow);
    }
  }
  console.log('flow ended');
};
