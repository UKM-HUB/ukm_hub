var Company = require('../models/model_company')
var mongoose = require('mongoose');
const multer = require('multer')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
// var helper = require('sendgrid').mail;
var sendEmail = require('../helpers/sendEmail')

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
      address:'',
      phone:'',
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
    let token = '';
    Company.findOne({email:req.body.email}).then(function(result){
      token = jwt.sign({ email: req.body.email, companyId: result._id, verified: result.verified,edited: result.edited }, 'ukmhub');
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
        company.category = req.body.category
        company.location.lat = req.body.lat
        company.location.lng = req.body.lng
        company.website = req.body.website
        company.address = req.body.address
        company.phone = req.body.phone
        company.description = req.body.description
        company.images = req.body.images
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
              images:req.body.images,
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
              images:req.body.images,
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

                requestArray.push({seller: data,request:dats})
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

                requestArray.push({seller: data ,request:dats})
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
                    from:req.params.id,
                    letterId: data.letter[data.letter.length-1]._id,
                    title:`${data.name} Answer your request with title: ${req.body.requestTitle} (id: ${req.params.requestId})- ${req.body.title}`,
                    date: new Date(),
                    status:'waiting',
                    message:req.body.message
                  },
                }
            },{
              new:true
            }, (err,datas)=>{
              if(err){
                res.send(err)
              }
              else{
                sendEmail(datas.email,`dear ${datas.name}, ${data.name} has answer your request (${req.body.title}), please contact ${data.name} for further information. may your business going well , happy to help you . regards UKMHUB team `, res)
              }
            }
          )
        }
      }
    )
  },
  acceptMessage: function(req,res){
    Company.findOne({_id:req.params.id}).then(function(result){
      result.acceptedMessages.forEach(function(x){
        if(x._id === req.params.acceptedMessagesId){
          x.status = 'accepted'
          x.save(function(err){
            if(err){
              res.send(err)
            }
            else{
              res.send('success')
            }
          })
        }


      })
    })
  },
  rejectMessage: function(req,res){
    Company.findOne({_id:req.params.id},function(result){
      result.acceptedMessages.status = 'refused'
      result.save(function(err){
        if(err){
          res.send(err)
        }
        else{
          Company.findOne({_id:result.acceptedMessages.from},function(result2){
            result2.letter.status = 'refused'
            result2.save(function(err){
              if(err){
                res.send(err)
              }
              else{
                sendEmail(result2.email,`dear ${result2.name}, ${result.name} has refused your answer to this request (${result3.title}), please contact ${result.name} for further information. may your business going well , happy to help you . regards UKMHUB team `, res)
              }
            })
          })
        }
      })
    })
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
          // update password from database
          Company.findOneAndUpdate({ _id: data._id },{ password: passwordHash.generate(newPassword) },function(err, update){
            // response update error
            if (err) throw err
            /*
              send email reset password
              =========================
              sendTo: req.body.email
              subjectEmail: Your password succesfully reset
              contentEmail: your password has been successfully reset, here your new password : <b>${newPassword}</b>
              responseServer: Email found, and we are send you a new password to your email
              =========================
              Useage
              =========================
              sendEmail( send to who, subject email, content email, message for server )
            */
            sendEmail(req.body.email, "Your password succesfully reset", `your password has been successfully reset, here your new password : <b>${newPassword}</b>`, "Email found, and we are send you a new password to your email", res)
          })
        // email not found
        }else{
          res.json("Email not found")
        }
    })
  }
}
