const express = require('express');

const PostsController = require('../controllers/posts');

const router = express.Router();

const checkAuth = require('../middleware/checkout-auth');
const extractFile = require('../middleware/file');


router.post("", checkAuth, extractFile , PostsController.createPost);

router.get("", PostsController.getPost);

router.get("/:id", PostsController.getPostById);

router.delete("/:id", checkAuth, PostsController.deletePostById);

router.put("/:id", checkAuth, extractFile, PostsController.updatePostById);


module.exports = router;
