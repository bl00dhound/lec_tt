/* eslint-disable promise/param-names */
// /* eslint-disable prefer-promise-reject-errors */
const bcrypt = require('bcrypt');

const generateHash = password => new Promise((res, rej) => bcrypt.hash(password, Number(process.env.TURNS), (err, hash) => {
  if (err) return rej(new Error('error'));
  return res(hash);
}));

module.exports = {
  generateHash,
};
