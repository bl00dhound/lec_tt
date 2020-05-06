const dal = require('./dal');
const validation = require('./validate');

const { generateHash, compareHash } = require('../../utils');

const service = {
  create: user => {
    const validatedUser = validation.user(user, true);
    if (!validatedUser) throw Error('Not valid user data');
    return generateHash(user.password).then(hash => {
      validatedUser.password = hash;
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
  login: async user => {
    if (!user.id) throw new Error('not valid user data');
    const dbUser = await dal.getUserById(user.id);
    const isPasswordEqual = await compareHash(user.password, dbUser.password);
    if (isPasswordEqual) return dbUser;
    return false;
  },
};

module.exports = service;
