const express = require('express');

const signUpRouter = express.Router();

signUpRouter.post('/api/microservice1/signup', (req, res) => {
  if (!req.body.email) {
    console.log('here');
    res.status(409).send({error: 'invalid!'});
  }
});

module.exports = signUpRouter;