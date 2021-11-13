const Commande = require('../models/commande');

/**
 * Get all commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllCommande = async (req, res, next) => {
    try{
        await Commande.find().then(docs => {
            res.status(200).json({commandes : docs});
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : "Erreur lors de la recuperation des commandes"})
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * Effectuer une nouvelle commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.createCommande = async (req, res, next) => {

}


/**
 * Get one commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getOneCommande = async (req, res, next) => {

}

/**
 * Update commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.updateCommade = async (req, res, next) => {

}

/**
 * Delete commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.deleteCommande = async (req, res, next) => {

}


/**
 * Recuperer tous les commandes non éffectuer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllCommandeNonEffectuer = async (req, res, next) => {

}

/**
 * Les commande deja effectuer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllCommandeEffectuer = async (req, res, next) => {

}


/**
 * Marquer la commande comme éffectuer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.marquerCommeEffectuer = async (req, res, next) => {

}