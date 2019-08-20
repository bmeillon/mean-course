const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts",(req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added good'
  });

});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: '4234234',
      title: 'First Title',
      content:'This is my first post from my first content'},
      { id: '345345',
      title: 'Second Title',
      content:'This is another thing from another book'}
  ];

   res.status(200).json({
    message: 'Posts Fetched Succesfully',
    posts: posts
  });

});


module.exports = app;
