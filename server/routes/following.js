const express = require('express');
const router = express.Router();
const FollowingController = require('../controllers/following')

module.exports = router 
  .get('/', FollowingController.getFollowing)
  .get('/:id', FollowingController.countFollowing)
  .get('/followers/:id', FollowingController.countFollower)
  .post('/', FollowingController.addFollowing)
  .post('/unfollowing', FollowingController.unFollowing)
