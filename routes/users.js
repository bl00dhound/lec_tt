const router = require('express').Router();

const service = require('../modules/user');

router.get('/:id', (req, res, next) => service
  .getUserById(req.params.id)
  .then(user => res.json(user))
  .catch(next));

router.get('/', (_req, res, next) => service
  .getAll()
  .then(users => res.json(users))
  .catch(next));

router.delete('/:id', (req, res, next) => service
  .remove(req.params.id)
  .then(user => res.json(user))
  .catch(next));

router.put('/:id', (req, res, next) => service
  .update(req.body)
  .then(user => res.json(user))
  .catch(next));

module.exports = router;
