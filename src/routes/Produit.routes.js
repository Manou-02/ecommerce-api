const upload = require('../../middleware/upload');
const { getAllProduits, addProduits, getOneProduits, updateProduits, deleteProduits } = require('../controllers/produits.controllers');
const routes = require('express').Router();
const authorization = require('../../middleware/authorization');



routes.get('/', getAllProduits);
routes.post('/', authorization,upload.array('images', 12) , addProduits);
routes.get('/:id', getOneProduits);
routes.patch('/:id',authorization ,upload.array('images', 12),updateProduits);
routes.delete('/:id', authorization, deleteProduits);


module.exports = routes;