const express = require('express');
const helmet = require('helmet');
const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use(helmet()); // helmet() returns a callback (req, res, next)
server.use('/api/posts', (req, res, next) => {next()}, postsRouter);
server.use('/api/users', (req, res, next) => {next()}, usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res, next) => {
  // catch all, 404 error middleware
  // calling 'next' with an argument sends the argument
  // to the error-handling middleware below
  console.log(`hitting ${req.method} ${req.baseUrl}`);
  next({ status: 404, message: 'not found' }); // this object becomes the "err" in the midd below
});

server.use((err, req, res, next) => { // error handling middleware
  // when someone else before calls next pasing an arg,
  // this thing shoots back a response to the client if anything goes wrong
  // in ANY of the middlewares that preceed this one
  res.status(err.status || 500).json({ message: `ERROR: ${err.message}` });
});

module.exports = server;
