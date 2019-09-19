const express = require('express');

const PostsController = require('../controllers/posts');

const router = express.Router();

const checkAuth = require('../middleware/checkout-auth');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpeg',
  'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mimeType");
    if(isValid){
      error = null;
    }
    cb(error, "../backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  },

});

router.post("", checkAuth,
multer({storage: storage}).single("image"), PostsController.createPost);

router.get("", PostsController.getPost);

router.get("/:id", PostsController.getPostById);

router.delete("/:id", checkAuth, PostsController.deletePostById);

router.put("/:id", checkAuth, multer({storage: storage}).single("image"), PostsController.updatePostById);


module.exports = router;
