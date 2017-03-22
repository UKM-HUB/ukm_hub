var express = require('express');
var multer  = require('multer')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

// add pack for validation
var expressValidator = require('express-validator')

// add pack for login
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

// import router
var index = require('./routes/index');
var users = require('./routes/users');
var companies = require('./routes/companies');
var coops = require('./routes/coops')

var app = express();

// load model coop & company
const modelCoop = require('./models/model_coop');
const modelCompany = require('./models/model_company')
// setup passport, passport-local ( middleware for login )
passport.use('coop-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},function(emailInput, passwordInput, done){
  modelCoop.findOne({ email: emailInput }, function(err, data){
    if (!data) {
      // data not found, call done function
      done(null, false, {message: 'incorect username'})
    }else{
      if (passwordHash.verify(passwordInput, data.password)) {
        // data found
        done(null, data)
      }else{
        // err password salah | engak ada res juga adi engak bisa lempar, jadi pake done aja
        done(null, false, {message: 'incorect password'})
      }
    }
  })
}))

passport.use('company-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},function(emailInput, passwordInput, done){
  console.log(emailInput);
  console.log(passwordInput);
  modelCompany.findOne({ email: emailInput }, function(err, data){
    if (!data) {
      // data not found, call done function
      done(null, false, {message: 'incorect username'})
    }else{
      if (passwordHash.verify(passwordInput, data.password)) {
        // data found
        done(null, data)
      }else{
        // err password salah | engak ada res juga adi engak bisa lempar, jadi pake done aja
        done(null, false, {message: 'incorect password'})
      }
    }
  })
}))

passport.serializeUser(function(user, callback){
  callback(null, user)
})

app.use(passport.initialize())
app.use(passport.session())

var dbURI = process.env.MONGO_URL || 'mongodb://localhost/ukmhub'
// setup database target
mongoose.connect(dbURI);

// setup cors
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// use express-validation
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use router
app.use('/', index);
app.use('/users', users);
app.use('/api/company',companies);
app.use('/api/coop',coops);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
