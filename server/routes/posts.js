const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts')
const images = require('../helpers/images')

module.exports = router 
  .get('/', PostController.getPost)
  .put('/like/:id', PostController.postLike)
  .post('/', images.multer.single('image'), images.sendUploadToGCS, PostController.addPost)
  // .put()