var Company = require('../models/model_company')
var mongoose = require('mongoose');
const multer = require('multer')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

module.exports={
  register: function(req,res){
    var newCompany = new Company({
      email: req.body.email,
      password: passwordHash.generate(req.body.password),
      request:[],
      verified:false,
      created_at:new Date(),
      updated_at:new Date()
    })
    newCompany.save(function(err){
      if(err) throw err
      res.json(newCompany)
    })
  },
  login: function(req, res, next){
    console.log("masuk");
    var token = jwt.sign({ email: req.body.email }, 'ukmhub');
    res.send({ token: token })
  },
  editProfile: function(req,res){
    Company.findOne({_id:req.params.id},function(err,company){
      console.log(req.file);
      if(err){
        res.send(err)
      }
      else{
        company.name = req.body.name
        company.type = req.body.type
        company.category = JSON.parse(req.body.category)
        company.location.lat = req.body.lat
        company.location.lng = req.body.lng
        company.website = req.body.website
        company.address = req.body.address
        company.phone = req.body.phone
        company.description = req.body.description
        company.images = req.file
        company.updated_at = new Date()
        company.save(function(err){
          if(err){
            res.send(err)
          }
          else{
            res.json(company)
          }
        })

      }
    })
  },
  showByCategories: function(req,res){
    Company.findOne({_id:req.params.id}).then(function(result){
      if(result.type === 'corporate'){
        Company.find({type:'ukm',category: { $in:result.category} }).then(function(result){
          res.json(result)
        })
      }
      else{
        Company.find({type:'corporate',category:{$in:result.category}}).then(function(result){
          res.json(result)
        })
      }
    })
  },
  showOne: function(req,res){
    Company.findOne({_id:req.params.id}).then(function(result){
      res.json(result)
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
