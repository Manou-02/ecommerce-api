const multer = require('multer')


const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename : (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
})


module.exports = multer({storage : storage});