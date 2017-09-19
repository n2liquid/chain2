module.exports = async flow => {
  let ks = Object.keys(flow);
  let kNext = ks[0];

  while(kNext && kNext !== -1) {
    let ret = await flow[kNext]();
    kNext = ret || ks[ks.indexOf(kNext) + 1];
  }
};
