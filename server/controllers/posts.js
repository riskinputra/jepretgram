const Post         = require('../models/post')
const Following    = require('../models/following')

class PostController {
  static getPost(req, res) {
    Post.find().sort( { createdAt: -1 } )
    .populate('userId')
    .populate('like')
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Post',
        data: result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static getPostFollow(req, res) {
    Following.find({userId: req.params.id})
    .populate('userId')
    .populate('followingId')
    .exec()
    .then(result => {
      let newResult = []
      for(let i = 0; i < result.length; i++){
        console.log(result[i].followingId)
        Post.find({userId:result[i].followingId})
        .populate('userId')
        .exec()
        .then(dataPost => {
          res.status(200).json({
            message: 'Post Follow',
            data: dataPost
          })
        })
      }
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static addPost(req, res) {
    let dataPost = new Post({
      userId: req.body.userId,
      caption: req.body.caption,
      image: req.file.cloudStoragePublicUrl
    })
    dataPost.save()
    .then(result => {
      res.status(200).json({
        message: 'Success to Post',
        data: result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static postLike(req, res) {
    Post.findById(req.params.id)
    .then(dataLike => {
      dataLike.like.push(req.body.like)
      dataLike.save()
      .then(result => {
        res.status(200).json({
          message: 'Success to like',
          data: result
        })
      })
      .catch(err => {
        res.status(500).send(err)
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }
}

module.exports = PostController