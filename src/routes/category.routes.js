const { getAllCategory, addCategory, getOneCategory, updateCategory, deleteCategory } = require('../controllers/category.controllers');
const routes = require('express').Router();
const authorization = require('../../middleware/authorization');


routes.get('/', getAllCategory);
routes.post('/', authorization , addCategory);
routes.get('/:id', getOneCategory);
routes.patch('/:id', authorization ,updateCategory);
routes.delete('/:id', authorization ,deleteCategory);


module.exports = routes;