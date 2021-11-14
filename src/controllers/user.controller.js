const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


/**
 * Authentification
 */

/**
 * Signin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.signin = async (req, res, next) => {
    const {nameUser, emailUser, password} = req.body;

    const emailExist = await User.findOne({emailUser : emailUser})

    if(emailExist) return res.status(201).json({erreur : "L'email existe déjà"});
    
    try{
        const pass = await bcrypt.hash(password, 10)

        await User.create({nameUser, emailUser, password : pass}).then(docs => {
            res.status(200).json({user : docs})
        }).catch(err => {
            console.log(err);
            res.status(400).json({error : err})
        })

    }catch(err){
        console.log(err);
    }   
}

/**
 * Login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.login = async (req, res, next) => {
    const {emailUser, password} = req.body;

    try{
        const user = await User.findOne({emailUser : emailUser});
        if(!user) return res.json({erreur : "L'email n'existe pas"})
        const validPass = await bcrypt.compare(password, user.password);

        if(!validPass) res.status(400).json({erreur : "Mot de passe incorrect"})
        
        /**Generate token */

        const token = jwt.sign({id : user._id}, process.env.TOKEN_SECRET, {expiresIn : '1h'})

        res.header("auth-token", token).json({token : token})

    }catch(err){
        console.log(err);
    }

}

/**
 * Logout
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.logout = async (req, res, next) => {
    const userId = req.user
    
    try{
        const token = jwt.sign({id : userId}, process.env.TOKEN_SECRET, {expiresIn : '-1s'})
        if(token)return res.header("auth-token", "").json({success : "Logout"})
    }catch(err){
        console.log(err);
    }
}

/****Fin Auth */



/**
 * Get all user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAllUser = async (req, res, next) => {
    try{
        await User.find().select('-password').then(docs => {
            res.status(200).json({users : docs.map(u => u.toObject({getters : true}))})
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : err})
        })
    }catch(err){
        console.log(err);
    }
}

/**
 * Get one user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getOneUser = async (req, res, next) => {
    const {id} = req.params;

    if(!ObjectId.isValid(id)) return res.status(404).json({error : "ID inconnue"})

    try{
        await User.findOne({ _id : id}).select('-password').then(docs => {
            res.status(200).json({user : docs});
        }).catch(err => {
            console.log(err);
            res.status(400).json({error : err});
        })
    }catch(err){
        console.log(err);
    }
}


/**
 * Update user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.updateUser = async (req, res, next) => {
    const {id} = req.params;
    const {nameUser, emailUser, password} = req.body;

    if(!ObjectId.isValid(id)) return res.status(404).json({error :" ID inconnue"})

    try{
        await User.updateOne({_id : id}, {nameUser, emailUser, password})
            .then(() => {
                res.status(200).json({success : "User updated"})
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({erreur : err})
            })
    }catch(err){
        console.log(err);
    }
}


/**
 * Delete user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.deleteUser = async (req, res, next) => {
    const {id} = req.params;
    if(!ObjectId.isValid(id)) return res.status(404).json({erreur : "ID inconnue"})
    
    try{
        await User.deleteOne({_id : id}).then(() => {
            res.status(200).json({success : "supprimer avec succès"})
        }).catch(err => {
            console.log(err);
            res.status(400).json({erreur : err})
        })

    }catch(err){
        console.log(err);
    }
}