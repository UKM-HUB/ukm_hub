var modelCoop = require('../models/model_coop.js')
var modelCompany = require('../models/model_company.js')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

const coopController = {
  login: function(req, res, next){
    var token = jwt.sign({ email: req.body.email }, 'ukmhub');
    res.send({ token: token })
  },
  register: function(req, res, next){
    // create model data
    var newCoop = modelCoop({
      email: req.body.email,
      password: passwordHash.generate(req.body.password)
    })
    // model data save to database
    newCoop.save(function(err, data){
      if (err) throw err
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
