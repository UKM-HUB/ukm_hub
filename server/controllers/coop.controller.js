var modelCoop = require('../models/model_coop.js')
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
  }
}

module.exports = coopController
