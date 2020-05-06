const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.resolve(__dirname, '../../data/users.json');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const _readJSON = () => readFile(DATA_FILE, 'utf-8').then(data => (data ? JSON.parse(data) : []));

const dal = {
  create: user => {
    user.id = new Date().valueOf();
    return _readJSON()
      .then(users => {
        users.push(user);
        return writeFile(DATA_FILE, JSON.stringify(users));
      })
      .then(() => {
        delete user.password;
        return user;
      });
  },
  update: user => _readJSON()
    .then(users => users.filter(dbUser => Number(dbUser.id) !== Number(user.id)))
    .then(filteredUsers => {
      filteredUsers.push(user);
      return writeFile(DATA_FILE, JSON.stringify(filteredUsers));
    })
    .then(() => user),
  getUserById: id => _readJSON().then(users => users.find(user => Number(user.id) === Number(id))),
  getAll: _readJSON,
  remove: id => {
    let removedUser = null;
    return _readJSON()
      .then(users => {
        const filteredUsers = [];
        users.forEach(user => {
          if (Number(user.id) === Number(id)) removedUser = user;
          else filteredUsers.push(user);
        });
        return filteredUsers;
      })
      .then(filteredUsers => writeFile(DATA_FILE, JSON.stringify(filteredUsers)))
      .then(() => removedUser);
  },
};

module.exports = dal;
