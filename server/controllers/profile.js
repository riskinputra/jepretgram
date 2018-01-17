const User    = require('../models/user')
const bcrypt  = require('bcryptjs')

class ProfileController {
  static getAllProfile(req, res) {
    User.find()
    .then(result => {
      res.status(200).json({
        message: 'All Profile',
        data: result
      })
    })
  }

  static getProfile(req, res) {
    User.findById(req.params.id)
    .then(result => {
      res.status(200).json({
        message: 'Profile Found',
        data: result
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }

  static editProfile(req, res) {
    let hash = bcrypt.hashSync(req.body.password, 10)
    User.findById(req.params.id)
    .then(result => {
      result.username = req.body.username || result.username
      result.email = req.body.email || result.email
      result.password = hash || result.password
      result.image = req.file.cloudStoragePublicUrl || result.image
      
      result.save()
      .then(dataUser => {
        res.status(200).json({
          message    : 'Success to update',
          data       : dataUser
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(err)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  }
}

module.exports = ProfileController