const { getAllCommande, getOneCommande, createCommande, updateCommade, deleteCommande, getAllCommandeEffectuer, getAllCommandeNonEffectuer, marquerCommeEffectuer } = require('../controllers/commande.controller');

const routes = require('express').Router();

routes.get('/', getAllCommande);
routes.get('/:id', getOneCommande);

routes.post('/', createCommande);

routes.patch('/:id', updateCommade);
routes.delete('/:id', deleteCommande);

/**Status */
routes.get('/effectuer', getAllCommandeEffectuer);
routes.get('/non-effectuer', getAllCommandeNonEffectuer);

routes.patch('/to-effectuer', marquerCommeEffectuer);


module.exports = routes;