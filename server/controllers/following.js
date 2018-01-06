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
    let dataFollowing = new Following({
      userId: req.body.userId,
      followingId: req.body.followingId
    })
    dataFollowing.save()
    .then(result => {
      res.status(200).json({
        message: 'Success to add Folllowing',
        data: result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
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