var Company = require('../models/model_company')
var mongoose = require('mongoose');

module.exports={
  register: function(req,res){
    var newCompany = new Company({
      email: req.body.email
    })
    newCompany.save(function(err){
      if(err) throw err
      res.json(newCompany)
    })
  },
  showAll: function(req,res){
    Company.find().then(function(result){
      res.json(result)
    })
  },
  deleteAll: function(req,res){
    Company.remove().then(function(result){
      res.send('data berhasil dihapus')
    })
  }
}
