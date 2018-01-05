const Comment    = require('../models/comment')

class CommentController {
  static getComment(req, res){
    Comment.find()
    .then(result => {
      res.status(200).json({
        message: 'Comments',
        data: result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static addComment(req, res) {
    let dataComment = new Comment({
      postId : req.body.postId,
      userId : req.body.userId,
      text: req.body.text
    })
    dataComment.save()
    .then(result => {
      res.status(200).json({
        message: 'Success to add Comment',
        data: result
      })
    })
    .catch(err => res.status(500).send(err))
  }

}

module.exports = CommentController