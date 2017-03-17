var Company = require('../models/model_company')
var mongoose = require('mongoose');
const multer = require('multer')

module.exports={
  register: function(req,res){
    var newCompany = new Company({
      email: req.body.email,
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
        company.password = req.body.password
        company.location.lat = req.body.lat
        company.location.lng = req.body.lng
        company.website = req.body.website
        company.address = req.body.address
        company.phone = req.body.phone
        company.description = req.body.description
        company.images = req.file
        company.updated_at = new Date()
        company.markModified('category')
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
