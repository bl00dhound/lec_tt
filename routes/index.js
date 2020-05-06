const router = require('express').Router();

const sessionRouter = require('./session');
const usersRouter = require('./users');
const authorize = require('../middlewares/authorize');

router.use('/session', sessionRouter);
router.use('/users', authorize, usersRouter);

module.exports = router;
