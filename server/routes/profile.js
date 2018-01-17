const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile')
const images = require('../helpers/images')

module.exports = router 
  .get('/', ProfileController.getAllProfile)
  .get('/:id', ProfileController.getProfile)
  .put('/:id', images.multer.single('image'), images.sendUploadToGCS, ProfileController.editProfile)