const Category = require('../models/category');
const ObjectID = require('mongoose').Types.ObjectId;
/**
 * Get all category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllCategory = async (req, res, next) => {
    try{
        await Category.find().then(docs => {
            res.status(200).json({category : docs.map(categ => (categ.toObject({getters : true}))) })
        }).catch(err => {
            res.status(400).json("Erreur lors de la recuperation de tous les category : " + err);
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * Create a new category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.addCategory = async (req, res, next) => {
    const {libelleCateg, descCateg} = req.body;
    try{
        await Category.create({libelleCateg, descCateg}).then(docs => {
            res.status(200).json({success : docs})
        }).catch(err => {
            res.status(400).json({error : err})
        })
    }catch(err){
        console.log("Add categ error : " + err);
    }
}

/**
 * Get one category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getOneCategory = async (req, res, next) => {
    const { id } = req.params;
    if(!ObjectID.isValid(id)) return res.status(404).json({Error : "Id non reconnu"})
    
    try{
        await Category.findOne({_id : id}).then(docs => {
            res.json({category  : docs.toObject({getters : true})})
        }).catch(err => {
            res.status(404).json("Not found : ", err)
        })
    }catch(err){
        console.log({Error : err});
    }
}

/**
 * Update a category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.updateCategory = async (req, res, next) => {
    const {id} = req.params
    const {libelleCateg, descCateg} = req.body

    if(!ObjectID.isValid(id)) return res.status(404).json({Error : "ID non reconnu"});

    try{
        await Category.updateOne({_id : id}, {libelleCateg, descCateg}).then(docs => {
            res.status(200).json({success : "Modifié avec succès"})
        }).catch(err => {
            res.status(400).json("Erreur lors de la modification ; ", err)
        })

    }catch(err){
        console.log(err);
    }

}

/**
 * Delete a category
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.deleteCategory = async (req, res, next) => {
    const {id} = req.params;

    if(!ObjectID.isValid(id)) return res.status(404).json({Error : "id non reconnu"})

    try{
        await Category.deleteOne({_id : id}).then(() => {
            res.status(200).json({success : "Supprimer avec succès"});
        }).catch(err => {
            res.status(400).json({erreur :  "Erreur lors de la suppression"})
        })
    }catch(err){
        console.log(err);
    }

}