const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

/**Require routes */
const categoryRoutes = require('./src/routes/category.routes');
const produitRoutes = require('./src/routes/Produit.routes');
const userRoutes = require('./src/routes/user.routes');



const app = express();
const PORT = process.env.PORT || 5001;
const DB_URI_LOCAL = process.env.DB_URI_LOCAL;


/**Middleware */
app.use(express.json())
app.use(cors())
app.use('./public/uploads', express.static('./public/uploads'));

/**Les routes */
app.use('/api/category', categoryRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/user', userRoutes);


/**Connexion au DB */
mongoose.connect(DB_URI_LOCAL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started in port ${PORT}`);
        })
    })
    .catch(err => {
        console.log("Erreur lors de la connexion au DB : " + err);
    })