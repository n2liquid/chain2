module.exports = () => {
  try {
    return JSON.parse(localStorage.getItem('chainState'));
  }
  catch (err) {
    return null;
  }
};
