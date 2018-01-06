const Following    = require('../models/following')
const User         = require('../models/user')

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

  // static follow(req, res) {
  //   User.findById(req.params.id)
  //   .then(dataFollow => {
  //     dataFollow.like.push(req.body.follow)
  //     dataFollow.save()
  //     .then(result => {
  //       res.status(200).json({
  //         message: 'Success to follow',
  //         data: result
  //       })
  //     })
  //     .catch(err => {
  //       res.status(500).send(err)
  //     })
  //   })
  //   .catch(err => {
  //     res.status(500).send(err)
  //   })
  // }
}

module.exports = FollowingController