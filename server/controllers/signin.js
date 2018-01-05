const User    = require('../models/user')
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
require('dotenv').config()

class Signin {
  static findOne(req, res) {
    User.findOne({
      email: req.body.email
    })
    .then( dataUser => {
      if (!dataUser) {
        res.status(500).json({
          message: 'E-mail Not Match'
        })
      }
      let temp = bcrypt.compare(req.body.password, dataUser.password)
      if (!temp) {
        res.status(500).json({
          message : "Password Incorrect"
        })
      } else {
        jwt.sign({id: dataUser.id, username: dataUser.username, email: req.body.email}, process.env.SECRET_KEY, function(err, token){
          // console.log(token);
          res.status(200).json({
            message: 'User Found',
            token: token
          })
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  }
}

module.exports = Signin