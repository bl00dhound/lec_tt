const router = require('express').Router();

const userService = require('../modules/user');
const { jwtSign } = require('../utils');

router.post('/registration', (req, res, next) => userService
  .create(req.body)
  .then(user => {
    const token = jwtSign(user);
    res.cookie('jwt', token, { maxAge: 60000 * 60 * 24 * 31, path: '/' });
    return res.status(201).json(user);
  })
  .catch(next));

router.post('/login', (req, res) => {
  console.log('login');
  return res.send('login');
});

router.post('/logout', (req, res) => {
  console.log('logout');
  return res.send('logout');
});

module.exports = router;
