const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
// const Users = require('../users/users-model');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  Posts.get(req.query)
  .then(hubs => {
    res.status(200).json(hubs);
  })
  .catch(error => {
    next(error) // send that object over to the err handling midd!
  });
});
module.exports = router;