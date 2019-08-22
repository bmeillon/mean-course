const express = require('express');
const Post = require('../models/post');

const router = express.Router();


router.post("",(req, res, next) => {
  //const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added good',
      postId: createdPost._id
    });
  });
});

router.get("", (req, res, next) => {
  /* const posts = [
    { id: '4234234',
      title: 'First Title',
      content:'This is my first post from my first content'},
      { id: '345345',
      title: 'Second Title',
      content:'This is another thing from another book'}
  ]; */

  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts Fetched Succesfully',
        posts: documents
      });
    });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({ message: "Not found post!"});
    }
  })
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message : "Post deleted!"
    });
  });

});

router.put("/:id", (req,res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Updated Succesfully"});
  });
});


module.exports = router;
