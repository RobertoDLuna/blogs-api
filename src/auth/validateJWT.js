const jwt = require('jsonwebtoken');

require('dotenv/config');
const ServiceUser = require('../services/service.user');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await ServiceUser.getById(decoded.data.userId);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar o token do usuário.' });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};