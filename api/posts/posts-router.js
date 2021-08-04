const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
// const Users = require('../users/users-model');
const Posts = require('./posts-model');
// const Users = require('../users/users-model');
const { validatePostId, validatePost, logger } = require('../middleware/middleware')


const router = express.Router();



router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    next(error) 
  });
});
module.exports = router;

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});

router.post('/', validatePost, (req, res, next) => {
    // RETURN THE NEWLY CREATED Post OBJECT
    // this needs a middleware to check that the request body is valid
    Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      next(error)
    });
  });

  router.put('/:id', validatePost, (req, res, next) => {
    // RETURN THE NEWLY CREATED Post OBJECT
    // this needs a middleware to check that the request body is valid
    const { id } = req.params
    Posts.update(id, req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      next(error)
    });
  });