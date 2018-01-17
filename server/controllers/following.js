const Following    = require('../models/following')
class FollowingController {
  static getFollowing(req, res) {
    Following.find()
    .populate('userId')
    .populate('followingId')
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Following',
        data: result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static addFollowing(req, res) {
    if (req.body.followingId) {
      Following.findOrCreate(
        {userId: req.body.userId,
        followingId: req.body.followingId}, 
        function(err, result){
        if(!err){  
          res.status(200).json({
            message: 'Success to Following',
            data: result
          })
        } else {
          res.status(500).send(err)
        }  
      })
    }
  }

  static unFollowing(req, res){
    if (req.body.followingId) {
      Following.remove({
        userId: req.body.userId,
        followingId: req.body.followingId
      })
      .then(result => {
        res.status(200).json({
          message: 'UnFollowing Success',
          data: result
        })
      })
      .catch(err => {
        res.status(500).send(err)
      })
    }
  }

  static countFollowing(req, res) {
    Following.find({userId: req.params.id})
    .then(result => {
      res.status(200).json({
        message: 'Following Count',
        data: result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static countFollower(req, res) {
    Following.find({followingId: req.params.id})
    .then(result => {
      res.status(200).json({
        message: 'Following Count',
        data: result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }
}

module.exports = FollowingController