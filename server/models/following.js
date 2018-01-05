const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema          = mongoose.Schema

const followingSchema = new Schema({
  userId : {
    type      : Schema.Types.ObjectId,
    ref       : 'User'
  },
  followingId : {
    type      : Schema.Types.ObjectId,
    ref       : 'User'
  },
  createdAt : {
    type      : Date,
    default   : new Date()
  }
})

followingSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator'})
const Following = mongoose.model("Following", followingSchema);
module.exports = Following