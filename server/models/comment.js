const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema          = mongoose.Schema

const commentsSchema = new Schema({
  postId  : {
    type      : Schema.Types.ObjectId,
    ref       : 'Post'
  },
  userId     : {
    type      : Schema.Types.ObjectId,
    ref       : 'User'
  },
  text  : {
    type      : String,
    required  : [true, 'Text is required']  
  },
  createdAt : {
    type      : Date,
    default   : new Date()
  }
})

commentsSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator'})
const Comment = mongoose.model("Comment", commentsSchema);
module.exports = Comment