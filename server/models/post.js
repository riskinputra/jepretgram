const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema          = mongoose.Schema

const postsSchema = new Schema({
  image  : {
    type      : String,
    required  : [true, 'Image required']
  },
  caption     : {
    type      : String,
    default   : null
  },
  userId  : {
    type      : Schema.Types.ObjectId,
    ref       : 'User'  
  },
  like    : [{
    type      : Schema.Types.ObjectId,
    ref       : 'User'
  }],
  createdAt : {
    type      : Date,
    default   : new Date()
  }
})

postsSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator'})
const Post = mongoose.model("Post", postsSchema);
module.exports = Post