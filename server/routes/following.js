const express = require('express');
const router = express.Router();
const FollowingController = require('../controllers/following')

module.exports = router 
  .get('/', FollowingController.getFollowing)

  .post('/', FollowingController.addFollowing)