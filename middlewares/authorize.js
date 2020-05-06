const { jwtVerify } = require('../utils');

const userService = require('../modules/user');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.send(401);
  let result = null;
  try {
    result = jwtVerify(token);
  } catch (e) {
    res.send(403);
  }
  const { id } = result.data;
  req.user = await userService.getUserById(id);
  return next();
};
