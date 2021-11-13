const mongoose = require('mongoose');


const produitSchema = new mongoose.Schema({
    nomProd : {
        type : String,
        required : true,
    },
    descProd : {
        type : String,
        required : true,
    },
    prixProd : {
        type : Number,
        required : true,
    },
    rateProd : {
        type : Number,
        required : true,
        min : 0,
        max : 5
    },
    images : [],
    category : {type : mongoose.Types.ObjectId, required : true, ref : 'Category'}
}, {timestamps : true})


module.exports = mongoose.model('Produit', produitSchema);