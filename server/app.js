const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const cors          = require('cors')
// =========================================================
const index         = require('./routes/index');
const signup        = require('./routes/signup');
const signin        = require('./routes/signin');
const following        = require('./routes/following');
const posts        = require('./routes/posts');
const comments        = require('./routes/comments');
// =========================================================
const app = express();
require('dotenv').config()
// =========================================================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// =========================================================
const db            = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/jepretgram')
// mongoose.connect(`mongodb://admin:${process.env.PASSWORD}@cluster0-shard-00-00-4ut9u.mongodb.net:27017,cluster0-shard-00-01-4ut9u.mongodb.net:27017,cluster0-shard-00-02-4ut9u.mongodb.net:27017/jepretgram?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we\'re connected to database!')
});
// =========================================================
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// =========================================================
app.use('/', index);
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/following', following);
app.use('/posts', posts);
app.use('/comments', comments);
// =========================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// =========================================================
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(err.status || 500);
  res.status(err);
});
// =========================================================
module.exports = app;
