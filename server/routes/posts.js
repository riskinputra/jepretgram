const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts')
const images = require('../helpers/images')

module.exports = router 
  .get('/:id', PostController.getPost)
  .get('/follow/:id', PostController.getPostFollow)
  .put('/like/:id', PostController.postLike)
  .post('/', images.multer.single('image'), images.sendUploadToGCS, PostController.addPost)
  // .put()