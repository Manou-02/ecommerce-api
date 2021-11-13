const Produit = require('../models/produits');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Get all produits
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllProduits = async (req, res, next) => {
    try{
        await Produit.find().populate('category').then(docs => {
            res.status(200).json({produits : docs.map(p => p.toObject({getters : true}))})
        }).catch(err => {
            res.status(404).json({Erreur : "Aucun élèment trouvé"});
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * Create new produits
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.addProduits = async (req, res, next) => {
    const {nomProd, descProd, prixProd, rateProd, category} = req.body;
    const images = req.files?.map(file => file.path)

    try{
        await Produit.create({nomProd, descProd, prixProd, rateProd, category, images}).then(docs => {
            res.status(200).json({produit : docs})
        }).catch(err => {
            res.json("Erruer lors de la creation du produit : ", err);
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * Get one product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getOneProduits = async (req, res, next) => {
    const {id} = req.params;
    if(!ObjectId.isValid(id)) return res.status(404).json({erreur : "ID inconnue"})

    try{    
        await Produit.findOne({_id : id}).populate('category').then(docs => {
            res.status(200).json({produit : docs.toObject({getters : true})})
        }).catch(err => {
            res.status(404).json({"Introuvables " : err });
        })
    }catch(err){
        console.log(err);
    }

}

/**
 * Update product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.updateProduits = async (req, res, next) => {
    const {id} = req.params;
    const {nomProd, descProd, prixProd, rateProd, category} = req.body;
    const images = req.files?.map(i => i.path);
    console.log(images);

    if(!ObjectId.isValid(id)) return res.status(404).json({erreur : "ID inconnue"})

    try{
        await Produit.updateOne({_id : id}, {nomProd, descProd, prixProd, rateProd, category, images})
            .then(() => {
                res.status(200).json({success : "Modifié avec succès"})
            }).catch(err => {
                console.log(err);
                res.status(400).json({"Erreur lors de la modification" : err});
            })  
    }catch(err){
        console.log(err);
    }
}

/**
 * Delete produits
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.deleteProduits = async (req, res, next) => {
    const {id} = req.params;

    if(!ObjectId.isValid(id)) return res.status(404).json({erreur : "ID non reconnue"})

    try{
        await Produit.deleteOne({_id : id}).then(() => {
            res.status(200).json({success : "Produit supprimer avec succès"})
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : err})
        })
    }catch(err){
        console.log(err);
    }
}