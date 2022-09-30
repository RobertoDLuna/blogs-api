require('dotenv/config');

const jwt = require('jsonwebtoken');
const ServiceCategory = require('../services/service.category');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createNewCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: '"name" is required' });

        const { message } = await ServiceCategory(req.body);

        jwt.sign({ data: { userID: message.id } }, secret, jwtConfig);
        res.status(201).json({ message });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createNewCategory,
};