const express = require('express');
const signUpRouter = require('./routes');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__direname + ....));

app.use(signUpRouter)
module.exports = app;