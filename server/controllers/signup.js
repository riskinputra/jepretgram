const User    = require('../models/user')
const bcrypt  = require('bcryptjs')

class SignUp {
  static createUser(req,res) {
    let hash = bcrypt.hashSync(req.body.password, 10)
    if(req.file) {
      let dataUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        image: req.file.cloudStoragePublicUrl
      })
      dataUser.save()
      .then(result => {
        res.status(200).json({
          message: 'Success to insert',
          data: result
        })
      })
      .catch(err => {
        res.status(500).send(err)
      })
    }else{
      let dataUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: hash
      })
      dataUser.save()
      .then(result => {
        res.status(200).json({
          message: 'Success to insert',
          data: result
        })
      })
      .catch(err => {
        res.status(500).send(err)
      })
    }
  }
}

module.exports = SignUp