var modelCoop = require('../models/model_coop.js')
var modelCompany = require('../models/model_company.js')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
const assert = require('assert');

const coopController = {
  login: function(req, res, next){
    /*
      expiresIn : 60 * 60
      60 * 60 = 3600 = 1 hour
      60 * 1 = 60 = 1 minute
    */
    modelCoop.findOne({}, 'name email ' ,function(err, data){
      if (err) throw err
      let token = jwt.sign({data}, 'ukmhub', { expiresIn: 60 * 60 });
      res.send({ token: token })
    })
  },
  register: function(req, res, next){
    // prevent to create coop with null password
    if (req.body.password == '') {
      res.json("you must insert your password")
    }

    // create model data
    var newCoop = modelCoop({
      email: req.body.email,
      password: passwordHash.generate(req.body.password)
    })
    // model data save to database
    newCoop.save(function(err, data){
      // validation email
      if(err){
        if (err.errors['email'].message) {
          res.json(err.errors['email'].message)
        }
      }

      // validation password

      // if (err) throw err
      res.json(data)
    })
  },
  getAllCoop: function(req, res, next){
    modelCoop.find({}, function(err, data){
      if (err) throw err
      res.json(data)
    })
  },
  verify: function(req, res, next){
    modelCompany.findOneAndUpdate({ _id: req.params.id }, { verified: true }, function(err, data){
      if (err) throw err
      res.json(data)
    })
  },
  unverify: function(req, res, next){
    modelCompany.findOneAndUpdate({ _id: req.params.id }, { verified: false }, function(err, data){
      if (err) throw err
      res.json(data)
    })
  }
}

module.exports = coopController
