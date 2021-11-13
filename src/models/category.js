const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    libelleCateg : {
        type : String,
        required : true,
        trime : true
    },
    descCateg : {
        type : String,
        required : true,
        trim : true
    },
    produit : [{type : mongoose.Types.ObjectId, ref : 'Produit'}]
}, {
    timestamps : true
})



module.exports = mongoose.model('Category', categorySchema);