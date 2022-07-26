const express = require('express');
const { body, validationResult } = require('express-validator');

const signUpRouter = express.Router();
const signUpURL = '/api/microservice1/signup';
signUpRouter.post(signUpURL,
  [
    body('email').isEmail().withMessage('Invalid Email!'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters'),
    body('password').matches(/^(.*[a-z].*)$/).withMessage('Passord must constain at least 1 lowercase letter'),
    body('password').matches(/^(.*[A-Z].*)$/).withMessage('Passord must constain at least 1 uppercase letter'),
    body('password').matches(/^(.*\d.*)$/).withMessage('Password must have at least 1 number')
  ],
  (req, res) => {
    const errors = validationResult(req);
    const containsErrros = !errors.isEmpty();

    if (containsErrros) {
      res.status(409).send({error: 'invalid!'});
    }

    res.sendStatus(200);
});

// all other request
signUpRouter.all(signUpURL, (req, res) => {
  res.sendStatus(405);
});

module.exports = {signUpRouter, signUpURL};