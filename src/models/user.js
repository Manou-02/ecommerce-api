const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nameUser : {
        type : String,
        required : true,
        trim : true
    },
    emailUser : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        min : 6,
    },
    role : {
        type : String,
        required : true,
        default : 'Admin'
    }
})

module.exports = mongoose.model('User', userSchema);