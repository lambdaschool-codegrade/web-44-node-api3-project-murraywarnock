const express = require('express');


// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');
const Posts = require('../posts/posts-model')
const { validateUserId, validateUser, validatePost, logger } = require('../middleware/middleware')

const router = express.Router();

router.get('/', logger, (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    next(error) 
  });
});

router.get('/:id', validateUserId, logger, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, logger, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    next(error)
  });
});

router.put('/:id', validateUserId, validateUser, logger, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  Users.update(id, req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      next(error)
    });
});

router.delete('/:id', validateUserId, logger, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  Users.remove(id, req.body)
    .then(user => {
      res.status(201).json(req.user);
    })
    .catch(error => {
      next(error)
    });
});

router.get('/:id/posts', validateUserId, logger, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      next(error)
    });
});

router.post('/:id/posts', validateUserId, validatePost, logger, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // const { id } = req.params;
  // Posts.insert(req.body)
  //   .then(post => {
  //     res.status(200).json(post);
  //   })
  //   .catch(error => {
  //     next(error)
  //   });
  try{
    const result = await Posts.insert({ 
      user_id: req.params.id, 
      text: req.text, 
    })
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }

});


// do not forget to export the router
module.exports = router;
