const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://bmeillon:ACSf6CTCaXRQD1n8@meancourse-wtp9c.mongodb.net/mean-bm?retryWrites=true&w=majority")
.then(()=>{
  console.log('Connectec to db!');
})
.catch(()=>{
  console.log('Connection Failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts",(req, res, next) => {
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

app.get('/api/posts', (req, res, next) => {
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

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message : "Post deleted!"
    });
  });

});

app.put("/api/posts/:id", (req,res, next) => {
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
module.exports = app;
