const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');


function logger(req, res, next) {
  // DO YOUR MAGIC
}

function validateUserId(req, res, next) {
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next() 
      } else {
        next({ message: "user not found", status: 404 })
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  const { name } = req.body
  if (!name) { 
    next({ message: "missing required name field", status: 400 })
  } else {
    next()
  }
}

function validatePostId(req, res, next) {
  const { id } = req.params
  Posts.getById(id)
    .then(post => {
      if (post) {
        req.post = post
        next() 
      } else {
        next({ message: `Post with id ${id} not found!` })
      }
    })
    .catch(next)
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text) { 
    next({ message: "missing required text field", status: 400 })
  } else {
    next()
  }
}


// do not forget to expose these functions to other modules
module.exports = { validateUser, validateUserId, logger, validatePost, validatePostId };