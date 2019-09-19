const Post = require('../models/post');




exports.createPost = (req, res, next) => {
  const url =req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });


  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added good',
      post: {
        ...createdPost,
        id: createdPost._id,

      }
    });
  });
}

exports.getPost = (req, res, next) => {
  // Pagination
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }

  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts Fetched Succesfully',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
}

exports.getPostById = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({ message: "Not found post!"});
    }
  })
}

exports.deletePostById = (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n > 0) {
      res.status(200).json({message: "Deletion Succesfully"});
    }
    else {
      res.status(401).json({message: "Not authorized"});
    }
  });

}

exports.updatePostById = (req,res, next) => {
  // Si tenemos un archivo, este if nos valida ponerle un nombre
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  console.log(post);
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    if (result.n > 0) {
      res.status(200).json({message: "Updated Succesfully"});
    }
    else {
      res.status(401).json({message: "Not authorized"});
    }

  });
}
