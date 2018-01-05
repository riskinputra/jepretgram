const express = require('express');
const router = express.Router();
const SignIn = require('../controllers/signin')

module.exports = router 
  .post('/', SignIn.findOne)