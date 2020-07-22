const express = require('express');

const UserController = require('../controllers/user.controller');
const isAuth = require('../middlewares/auth');

const routes = express.Router();

routes.post('/users/signup', UserController.signUp);
routes.post('/users/signin', UserController.signIn);
routes.get('/users/', UserController.showAllUsers);
routes.get('/users/:userID', isAuth, UserController.getUserById);
routes.put('/users/:userID', isAuth, UserController.updateUser);
routes.delete('/users/:userID', isAuth, UserController.deleteUser);

module.exports = routes;
