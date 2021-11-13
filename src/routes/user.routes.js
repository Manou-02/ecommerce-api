const { login, getAllUser, updateUser, deleteUser, signin, getOneUser, logout } = require('../controllers/user.controller');

const routes = require('express').Router();
const authorization = require('../../middleware/authorization');

/**
 * Authentification
 */

routes.post('/signin', signin);
routes.post('/login', login);
routes.post('/logout',logout);


routes.get('/', authorization , getAllUser);
routes.get('/:id', authorization, getOneUser);
routes.patch('/:id',authorization, updateUser);
routes.delete('/:id',authorization, deleteUser)


module.exports = routes;