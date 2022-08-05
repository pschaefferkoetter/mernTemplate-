const express = require('express');
const { body, validationResult } = require('express-validator');

const signUpRouter = express.Router();
const signUpURL = '/api/microservice1/signup';

signUpRouter.post(signUpURL,
  [
    body('email')
      .isEmail()
      .withMessage('Invalid Email!')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({min: 8})
      .withMessage('Password must be at least 8 characters')
      .escape(),
    body('password')
      .matches(/^(.*[a-z].*)$/)  // regex for at least 1 lower case letter
      .withMessage('Passord must constain at least 1 lowercase letter'),
    body('password')
      .matches(/^(.*[A-Z].*)$/)  // regex for at least one upper case letter
      .withMessage('Passord must constain at least 1 uppercase letter'),
    body('password')
      .matches(/^(.*\d.*)$/)  // regex for at least one number
      .withMessage('Password must have at least 1 number')
  ],
  (req, res) => {
    const errors = validationResult(req);
    const containsErrros = !errors.isEmpty();

    if (containsErrros) {
      res.status(409).send({error: 'invalid!'});
    }

    if(/.+@[A-Z]/g.test(req.body.email)) {      // regex cheking for cap after the @ in an email
      res.sendStatus(409)
    }

    if(/[><'"\/]/g.test(req.body.password)) {
      res.sendStatus(409);
    }

    res.send({email: req.body.email});
});

// all other request
signUpRouter.get(signUpURL, (req, res) => {
  res.sendStatus(405);
});

signUpRouter.delete(signUpURL, (req, res) => {
  res.sendStatus(405);
})

module.exports = {signUpRouter, signUpURL};