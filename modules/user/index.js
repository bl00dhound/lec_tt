const dal = require('./dal');
const validation = require('./validate');

const { generateHash } = require('../../utils');

const service = {
  create: user => {
    const validatedUser = validation.user(user, true);
    if (!validatedUser) throw Error('Not valid user data');
    return generateHash(user.password).then(hash => {
      user.password = hash;
      return dal.create(validatedUser);
    });
  },
  getUserById: id => dal.getUserById(id),
  getAll: dal.getAll,
  remove: dal.remove,
  update: user => {
    const validatedUser = validation.user(user, false);
    if (!validatedUser) throw Error('Not valid user data');

    return dal.update(validatedUser);
  },
};

module.exports = service;
