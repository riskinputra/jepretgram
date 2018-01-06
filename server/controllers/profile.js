const User    = require('../models/user')
const bcrypt  = require('bcryptjs')

class ProfileController {
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
}

module.exports = ProfileController