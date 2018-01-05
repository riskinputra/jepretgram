const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema          = mongoose.Schema

const usersSchema = new Schema({
  username  : {
    type      : String,
    required  : [true, 'Username required']
  },
  email     : {
    type      : String,
    unique    : true,
    required  : [true, 'Email required']
  },
  password  : {
    type      : String,
    required  : [true, 'Password required']   
  },
  image    : {
    type    : String,
    default : 'https://storage.googleapis.com/rnp-jepretgram/user.png'
  },
  createdAt : {
    type      : Date,
    default   : new Date()
  }
})

usersSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator'})
const User = mongoose.model("User", usersSchema);
module.exports = User