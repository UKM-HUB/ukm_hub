var express = require('express');
var router = express.Router();
var coopController = require('../controllers/coop.controller.js')
var passwordHash = require('password-hash');
var passport = require('passport')
var jwt = require('jsonwebtoken');

// middleware for cheack login
var objVerify = {
  verify: function(req, res, next){
    console.log("masuk");
    console.log(req.headers.token);
    if (req.headers.token == 'null' || req.headers.token == undefined) {
      res.json("you don't have access token")
    }else{
      if (jwt.verify(req.headers.token, 'ukmhub')) {
        next()
      }else {
        res.json("token already expried")
      }
    }
  }
}

/* http://localhost:3000/api/coop/login | login */
router.post('/login', passport.authenticate('test-login'),coopController.login)

/* http://localhost:3000/api/coop/register | register new coop just for development */
router.post('/register', coopController.register)

/* http://localhost:3000/api/coop/ | get all data coop */
router.get('/', objVerify.verify, coopController.getAllCoop)

module.exports = router;
