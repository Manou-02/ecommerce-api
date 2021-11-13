const jwt = require('jsonwebtoken')

module.exports =  (req, res, next) => {
    const token = req.header('auth-token');

    if(!token) return res.status(403).json("Non authorisé");
    try{
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    }catch(err){
        res.status(400).json({erreur: "Invalid token"})
    }
}