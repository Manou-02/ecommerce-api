const mongoose = require('mongoose')


const commandeSchema = new mongoose.Schema({
    client : {
        type : {
            nomClient : String,
            prenomClient : String,
            emailClient : String,
            adresse : {
                type : {
                    quarierClient : String,
                    villeClient : String,
                    provinceClient : String,
                }
            }
        },
        required : true
    },
    panier : {
        type : [
            {
                ligneCommande : {
                    produit : {type : mongoose.Types.ObjectId, ref : 'Produit'},
                    qte : Number    
                },
                
            }
        ],
        required : true
    },
    status : {
        type : Number,
        default : 0
    }
}, {
    timestamps : true
})


module.exports = mongoose.model('Commande', commandeSchema);