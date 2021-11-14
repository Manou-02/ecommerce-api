const Commande = require('../models/commande');
const ObjectId = require('mongoose').Types.ObjectId;
const sendEmail = require('../../utils/email');

/**
 * Get all commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllCommande = async (req, res, next) => {
    try{
        await Commande.find().populate('panier.ligneCommande.produit').then(docs => {
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
    const {client, panier} = req.body;
    try{
        await Commande.create({client, panier}).then(docs => {
            Commande.findOne({_id : docs._id}).populate('panier.ligneCommande.produit').then(data => {
                sendEmail(data);
                res.status(200).json({commande : data})
            })
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : "erreur lors de la commande"})
        })
    }catch(err){
        console.log(err);
    }

}


/**
 * Get one commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getOneCommande = async (req, res, next) => {
    const {id} = req.params;
    if(!ObjectId.isValid(id)) return res.status(404).json({erreur : "ID inconnue"})
    
    try{
        await Commande.findOne({_id : id}).then(docs => {
            res.status(200).json({commande : docs})
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : err})
        })
    }catch(err){
        console.log(err);
    }

}

/**
 * Update commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.updateCommade = async (req, res, next) => {
    const {id} = req.params
    const {client, produit} = req.body

    try{
        await Commande.updateOne({_id : id}, {client, commande}).then(docs => {
            res.status(200).json({success : "commande updated"});
        }).catch(err => {
            console.log(err);
            res.status(200).json({erreur : "erreur lors de la modification de la commande"})
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * Delete commande
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.deleteCommande = async (req, res, next) => {
    const {id} = req.params;
    if(!ObjectId.isValid(id)) return res.status(404).json({erreur : "ID inconnue"})

    try{
        await Commande.deleteOne({_id : id}).then(() => {
            res.status(200).json({success : "Commande supprimé"});
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : "Erreur lors de la suppression"})
        })
    }catch(err){
        console.log(err);
    }
}


/**
 * Recuperer tous les commandes non éffectuer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllCommandeNonEffectuer = async (req, res, next) => {
    try{
        await Commande.find({status : 0}).then(docs => {
            res.status(200).json({non_effectuer : docs});
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : "erreur lors de la recuperation des commandes non effectuer"})
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * Les commande deja effectuer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllCommandeEffectuer = async (req, res, next) => {
    try{
        await Commande.find({status : 1}).then(docs => {
            res.status(200).json({effectuer : docs});
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : "erreur lors de la recuperation des commandes effectuer"})
        })
    }catch(err){
        console.log(err);
    }
}


/**
 * Marquer la commande comme éffectuer
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.marquerCommeEffectuer = async (req, res, next) => {
    const {id} = req.params

    try{
        await Commande.updateOne({_id : id}, {status : 1}).then(docs => {
            res.status(200).json({success : "Commande marquer comme effectuer"})
        }).catch(err => {
            console.log(err);
            res.status(200).json({erreur : err})
        })
    }catch(err) {
        console.log(err);
    }
}