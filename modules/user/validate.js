const UserScheme = {
  id: { type: 'number', required: true },
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  phone: { type: 'string', required: true },
  email: { type: 'string', required: true },
  password: { type: 'string', required: true },
  meta: { type: 'object', required: false },
};

const validation = {
  user: (user, isCreate = false) => Object.keys(UserScheme).reduce((acc, key) => {
    if (key === 'id' && isCreate) return acc;

    const validator = UserScheme[key];
    const value = user[key];

    if (!value && !validator.required) return acc;
    if (!value && validator.required) throw new Error(`validation error: ${key} is required`);
    if (typeof value !== validator.type) throw new Error(`validation error: ${key} is not type of ${validator.type}`);

    return { ...acc, [key]: value };
  }, {}),
};

module.exports = validation;
