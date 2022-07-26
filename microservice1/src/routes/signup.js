const express = require('express');
const { body, validationResult } = require('express-validator');

const signUpRouter = express.Router();

signUpRouter.post('/api/microservice1/signup',
  body('username').isEmail().withMessage('Invalid Email!'),
  (req, res) => {
    const errors = validationResult(req);
    const containsErrros = !errors.isEmpty();

    if (containsErrros) {
      res.status(409).send({error: 'invalid!'});
    }

    res.sendStatus(200);
});

module.exports = signUpRouter;