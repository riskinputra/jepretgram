const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comments')

module.exports = router 
  .get('/', CommentController.getComment)
  .post('/', CommentController.addComment)