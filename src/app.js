const express = require('express');
const validateJWT = require('./auth/validateJWT');
const UserController = require('./controllers/user.controller');
const CategoryController = require('./controllers/category.controller');
const BlogPostController = require('./controllers/post.controller');
const { validatePost, validateUpdatePost } = require('./middlewares/post.middleware');
const { validateLogin, validateNewUser } = require('./middlewares/user.middleware');

// ...

const app = express();

app.use(express.json());

// ...
// app.get('/login', async (req, res) => { res.status(200).json({ message: 'deu certo' }); });
app.post('/login', validateLogin, UserController.login);
app.post('/user', validateNewUser, UserController.createUser);
app.post('/categories', validateJWT, CategoryController.createCategory);
app.post('/post', validateJWT, validatePost, BlogPostController.createPost);
app.get('/user', validateJWT, UserController.getAllUsers);
app.get('/post', validateJWT, BlogPostController.getAllPosts);
app.get('/post/:id', validateJWT, BlogPostController.getById);
app.put('/post/:id', validateJWT, validateUpdatePost, BlogPostController.updatePostById);
app.get('/user/:id', validateJWT, UserController.getById);
app.get('/categories', validateJWT, CategoryController.getAllCategories);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
