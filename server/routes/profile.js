const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile')

module.exports = router 
  .get('/:id', ProfileController.getProfile)