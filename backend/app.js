const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: '4234234',
      title: 'First Title',
      content:'fdewfewfer'},
      { id: '345345',
      title: '34534 Title',
      content:'345345345345345'}
  ];

   res.status(200).json({
    message: 'Posts Fetched Succesfully',
    posts: posts
  });

});


module.exports = app;
