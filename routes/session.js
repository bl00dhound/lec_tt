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

router.post('/login', (req, res, next) => userService
  .login(req.body)
  .then(user => {
    const token = jwtSign(user);
    res.cookie('jwt', token, { maxAge: 60000 * 60 * 24 * 31, path: '/' });
    return res.status(200).json(user);
  })
  .catch(next));

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', { expires: 0, path: '/' });
  return res.send(200);
});

module.exports = router;
