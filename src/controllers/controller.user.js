require('dotenv/config');

const jwt = require('jsonwebtoken');
const ServiceUser = require('../services/service.user');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const { type, message } = await ServiceUser.getByEmail(email);
    console.log('ronaldo', type, message);
    if (type) return res.status(type).json({ message });

    const token = jwt.sign({ data: { userId: message.id } }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { type, message } = await ServiceUser.createNewUser(req.body);
    console.log('roberto', type, message);
    if (type) return res.status(type).json({ message });
    const token = jwt.sign({ data: { userId: message.id } }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { type, message } = await ServiceUser.getAllUsers();
    if (type) return res.status(type).json({ message });
    jwt.sign({ data: { userId: message.id } }, secret, jwtConfig);

    return res.status(200).json(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await ServiceUser.getById(id);
    if (type) return res.status(type).json({ message });
    jwt.sign({ data: { userId: message.dataValues.id } }, secret, jwtConfig);

    return res.status(200).json(message.dataValues);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  createNewUser,
  getAllUsers,
  getById,
};