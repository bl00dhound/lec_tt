/* eslint-disable max-len */
/* eslint-disable promise/param-names */
// /* eslint-disable prefer-promise-reject-errors */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateHash = password => new Promise((res, rej) => bcrypt.hash(password, Number(process.env.TURNS), (err, hash) => {
  if (err) return rej(new Error('error'));
  return res(hash);
}));

const jwtSign = user => jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    data: {
      id: user.id,
      email: user.email,
    },
  },
  process.env.SECRET,
);

const jwtVerify = token => jwt.verify(token, process.env.SECRET);

const compareHash = (password, hash) => new Promise((res, rej) => bcrypt.compare(password, hash, (err, result) => {
  if (err) return rej(new Error('error'));
  return res(result);
}));

module.exports = {
  generateHash,
  jwtSign,
  compareHash,
  jwtVerify,
};
