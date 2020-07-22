const express = require('express');

const UserController = require('../controllers/user.controller');
const isAuth = require('../middlewares/auth');

const routes = express.Router();

routes.post('/signup', UserController.signUp);
routes.post('/signin', UserController.signIn);
routes.get('/', UserController.showAllUsers);
routes.get('/:userID', isAuth, UserController.getUserById);
routes.put('/:userID', isAuth, UserController.updateUser);
routes.delete('/:userID', isAuth, UserController.deleteUser);

module.exports = routes;
