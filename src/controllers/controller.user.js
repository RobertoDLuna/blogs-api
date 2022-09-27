require('dotenv/config');

const jwt = require('jsonwebtoken');
const ServiceUser = require('../services/service.user');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const { type, message } = await ServiceUser.getByEmail(email);
    console.log('ronaldo', type, message);
    if (type) return res.status(type).json({ message });

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: message.id } }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};