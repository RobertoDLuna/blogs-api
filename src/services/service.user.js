const { User } = require('../models');

const getByEmail = async (email) => {
    const result = await User.findOne({
        where: { email },
    });
    console.log(result);
    if (!result) return { type: 400, message: 'Invalid fields' };
    return { type: null, message: result.dataValues };
};

const getById = async (id) => {
    const result = await User.findOne({
        where: { id },
    });
    return result;
};

const creteNewUser = async (data) => {
  const response = await User.findOne({
    where: { email: data.email },
  });
  if (response) return { type: 409, message: 'User already registered' };
  const result = await User.create(data);
  return { type: null, message: result };
}; 

module.exports = {
    getByEmail,
    getById,
    creteNewUser,
};