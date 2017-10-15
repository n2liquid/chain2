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
      return rest.length >= 2 ? rest : rest[0];
    }

    kNext = ret || ks[ks.indexOf(kNext) + 1];
  }
};
