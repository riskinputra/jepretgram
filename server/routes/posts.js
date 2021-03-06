const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts')
const images = require('../helpers/images')

module.exports = router 
  .get('/', PostController.getAllPosts)
  .get('/:id', PostController.getPost)
  .get('/comments/:id', PostController.getPostComments)
  .get('/profile/:id', PostController.getPostProfile)
  .get('/follow/:id', PostController.getPostFollow)
  .put('/like/:id', PostController.postLike)
  .put('/:id', images.multer.single('image'), images.sendUploadToGCS, PostController.editPost)
  .post('/', images.multer.single('image'), images.sendUploadToGCS, PostController.addPost)
  .delete('/:id', PostController.deletePost)
  // .put()