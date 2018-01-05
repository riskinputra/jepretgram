const express = require('express');
const router = express.Router();
const SignUp = require('../controllers/signup')
const images = require('../helpers/images')

module.exports = router 
  .post('/', images.multer.single('image'), images.sendUploadToGCS, SignUp.createUser)