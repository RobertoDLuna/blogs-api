const express = require('express');
const ControllerUser = require('./controllers/controller.user');
const { validateLogin } = require('./middlewares/middleware.user');

// ...

const app = express();

app.use(express.json());

// ...
// app.get('/login', async (req, res) => { res.status(200).json({ message: 'deu certo' }); });
app.post('/login', validateLogin, ControllerUser.login);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
