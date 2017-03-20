var Company = require('../models/model_company')
var mongoose = require('mongoose');
const multer = require('multer')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var helper = require('sendgrid').mail;

function generatePassword() {
    var length = 5,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

module.exports={
  register: function(req,res,next){
    var newCompany = new Company({
      email: req.body.email,
      password: passwordHash.generate(req.body.password),
      verified:false,
      edited:false,
      name: '',
      category: [],
      verified:'',
      edited:'',
      type: '',
      location:{
        lat:'',
        lng:''
      },
      description: '',
      website: '',
      images: '',
      letter:[],
      acceptedMessages:[],
      created_at:new Date(),
      updated_at:new Date(),
    })
    newCompany.save(function(err){
      if(err) throw err
      let token = jwt.sign({ email: newCompany.email }, 'ukmhub');
      res.send({ token: token, companyId: newCompany._id ,verified: newCompany.verified,edited: newCompany.edited,email:newCompany.email})
    })
  },
  login: function(req, res, next){
    console.log(req.body);
    let token = jwt.sign({ email: req.body.email }, 'ukmhub');
    Company.findOne({email:req.body.email}).then(function(result){
    res.send({ token: token, companyId: result._id ,verified: result.verified,edited: result.edited })
    }
  )
  },
  editProfile: function(req,res){
    Company.findOne({_id:req.params.id},function(err,company){
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
        company.images = req.body.image
        company.updated_at = new Date()
        edited = true
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
    Company.findOne({_id:req.params.id},{password:0}).then(function(result){
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
  },
  checkCorporate: function(req,res,next){
    Company.findOne({_id:req.params.id}).then(function(result){
      if(result.type === 'corporate'){
        next()
      }
      else{
        res.send("your company is not a corporate type")
      }
    })
  },
  checkUkm: function(req,res,next){
    Company.findOne({_id:req.params.id}).then(function(result){
      if(result.type === 'ukm'){
        next()
      }
      else{
        res.send("your company is not a ukm type")
      }
    })
  },
  createBuyRequest: function(req,res){
    Company.findByIdAndUpdate(req.params.id,{
      $push:{
            'request':{
              types:"buy",
              title:req.body.title,
              price:Number(req.body.price),
              description:req.body.description,
              images:req.file,
              open:true
            }
          }
      },{
        new:true
      }, (err,data)=>{
        if(err){
          res.send(err)
        }
        else{
          res.send(data)
        }
      }
    )
  },
  createSellRequest: function(req,res){
    Company.findByIdAndUpdate(req.params.id,{
      $push:{
            'request':{
              types:"sell",
              title:req.body.title,
              price:Number(req.body.price),
              description:req.body.description,
              images:req.file,
              open:true
            }
          }
      },{
        new:true
      }, (err,data)=>{
        if(err){
          res.send(err)
        }
        else{
          res.send(data)
        }
      }
    )
  },
  showRequest: function(req,res){
    var requestArray =[]
    Company.findOne({_id:req.params.id}).then(function(result){
      if(result.type === 'corporate'){
        Company.find({type:'ukm',category: { $in:result.category} },{ password:0}).then(function(result){
          result.forEach(function(data){
            data.request.forEach(function(dats){
              if(dats.open==true){

                requestArray.push({seller: data._id,request:dats})
              }
            })
          })
          res.send(requestArray)
        })
      }
      else{
        Company.find({type:'corporate',category: { $in:result.category} },{ request: 1}).then(function(result){
          result.forEach(function(data){
            data.request.forEach(function(dats){
              if(dats.open==true){

                requestArray.push(dats)
              }
            })
          })
          res.send(requestArray)
        })
      }
    })
  },
  changeReqStatus: function(req,res){
    Company.findOne({_id:req.params.companyId}).then(function(result){
      result.request.forEach(function(data){
        if(data.id === req.params.requestId){
          if(data.open === true){
            data.open = false
            result.save(function(err){
              if(err){
                res.send(err)
              }
              else{
                res.json(result)
              }
            })
          }
          else{
            data.open = true
            result.save(function(err){
              if(err){
                res.send(err)
              }
              else{
                res.json(result)
              }
            })
          }
        }
      })
    })
  },
  createLetter:function(req,res){
    Company.findByIdAndUpdate(req.params.id,{
      $push:{
            'letter':{
              to:req.params.otherId,
              from:req.params.id,
              requestId:req.params.requestId,
              title:req.body.title,
              date: new Date(),
              status:'waiting',
              message:req.body.message
            },
          }
      },{
        new:true
      }, (err,data)=>{
        if(err){
          res.send(err)
        }
        else{
          Company.findByIdAndUpdate(req.params.otherId,{
            $push:{
                  'acceptedMessages':{
                    letterId: data.letter[data.letter.length-1]._id
                  },
                }
            },{
              new:true
            }, (err,datas)=>{
              if(err){
                res.send(err)
              }
              else{
                res.json(data)
              }
            }
          )
        }
      }
    )
  },
  resetPassword: function(req, res){
    // find email from data base
    Company.findOne({ email: req.body.email }, function(err, data){
      // response error
      if (err) throw err

        // email found in database
        if (data) {

          // generate new password
          var newPassword = generatePassword();

          // update password
          Company.findOneAndUpdate({ _id: data._id },{ password: passwordHash.generate(newPassword) },function(err, update){
            // response update error
            if (err) throw err

            // send email to company
            from_email = new helper.Email("alexanderhendrawan@gmail.com");
            to_email = new helper.Email(req.body.email);
            subject = "Your password succesfully reset";
            content = new helper.Content("text/html", `your password has been successfully reset, here your new password : <b>${newPassword}</b>`);
            mail = new helper.Mail(from_email, subject, to_email, content);

            var sg = require('sendgrid')('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');
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON()
            });

            sg.API(request, function(error, response) {
              if (error) console.log(error)
              // console.log(response.statusCode);
              // console.log(response.body);
              // console.log(response.headers);
              res.json("Email found, and we are send you a new password to your email")
            })
            // end function send email to company

          })


        // email not found
        }else{
          res.json("Email not found")
        }
    })
  }
}
