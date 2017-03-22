var Company = require('../models/model_company')
var mongoose = require('mongoose');
const multer = require('multer')
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
// var helper = require('sendgrid').mail;
var Module = require('module');
var fs     = require('fs');
Module._extensions['.png'] = function(module, fn) {
  var base64 = fs.readFileSync(fn).toString('base64');
  module._compile('module.exports="data:image/png;base64,' + base64 + '"', fn);
};

var sendEmail = require('../helpers/sendEmail')
var defaultCompanyImage = require ('../public/image/company_icon.png')
var defaultReqImage = require ('../public/image/box-outline-filled.png')

// function validation
var validationEditProfile = require('../helpers/validation/validationEditProfile')
var validationRequest = require('../helpers/validation/validationRequest')
var validationCreateLetter = require('../helpers/validation/validationCreateLetter')

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
      images: defaultCompanyImage,
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

    validationEditProfile(req.body.name, req.body.type, req.body.category, req.body.lat, req.body.lng, req.body.address, req.body.phone, req.body.description, res, function(){

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
          company.images = req.body.images||defaultCompanyImage
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

    validationRequest(req.body.title, req.body.description, res, function(){
      // save buy request to database
      Company.findByIdAndUpdate(req.params.id,{
        $push:{
              'request':{
                types:"buy",
                title:req.body.title,
                price:Number(req.body.price),
                description:req.body.description,
                images:req.body.images||defaultReqImage,
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

    })
  },
  createSellRequest: function(req,res){

    validationRequest(req.body.title, req.body.description,  res, function(){
      // save sell request to database
      Company.findByIdAndUpdate(req.params.id,{
        $push:{
              'request':{
                types:"sell",
                title:req.body.title,
                price:Number(req.body.price),
                description:req.body.description,
                images:req.body.images||defaultReqImage,
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
    })

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
        Company.find({type:'corporate',category: { $in:result.category} },{ password:0}).then(function(result){
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
              title:req.body.title||'my offer',
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
                    sender:data.name,
                    letterId: data.letter[data.letter.length-1]._id,
                    title:data.letter[data.letter.length-1].title,
                    requestTitle: req.body.requestTitle,
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
                sendEmail(datas.email,
                   "You received a new message",
                   `  <div style="text-align:center"><img src='https://raw.githubusercontent.com/UKM-HUB/ukm_hub/master/ukmhub.png' style="width:30%;"/></div>
                      <P>Dear <b>${datas.name}</b>,</P>
                      <p>to respond your request with subject <i><b>${datas.requestTitle}</b></i>, <b>${data.name}</b> have send you a message with title <b>"<i>${data.letter[data.letter.length-1].title}</i>"</b> .</p>
                      <p>please check your message box immediately to accept or refused the offer, Thank you for your attention </p>
                      <br/>
                    <p>regards,</p>
                      <p>UKM HUB teams</p> `,
                    "Your received new message", res)
              }
            }
          )
        }
      }
    )
  },
  acceptMessage: function(req,res){
    Company.findOne({_id:req.params.id}).then(function(result){
      result.acceptedMessages.forEach(function(receptor){
        if(receptor.id === req.params.acceptedMessagesId){
          receptor.status = 'accepted'
          result.save(function(err){
            if(err){
              res.send(err)
            }
            else{
              Company.findOne({_id:receptor.from}).then(function(result2){
                result2.letter.forEach(function(sender){
                  if(sender.id === receptor.letterId){
                    sender.status = 'accepted'
                    result2.save(function(err){
                      if(err){
                        res.send(err)
                      }
                      else{
                        result.request.forEach(function(compRequest){
                          if(compRequest.id === sender.requestId){
                            compRequest.open = false
                            result.save(function(err){
                              if(err){
                                res.send(err)
                              }
                              else{
                                sendEmail(result2.email, "Accepted request",
                                `  <div style="text-align:center"><img src='https://raw.githubusercontent.com/UKM-HUB/ukm_hub/master/ukmhub.png' style="width:40%;"/></div>
                                  <P>Dear <b>${result2.name}</b>,</P>
                                  <p><b>${result.name}</b> have <b>Accepted</b> your offer with title <b><i>"${sender.title}"</i></b> with message of "${sender.message}".</p>
                                  <p>for the request of <i><b>${receptor.title}</b></i>, contact <b>${result.name}</b> for futher information.</p>
                                  <br/>
                                  <p>regards,</p>
                                  <p>UKM HUB teams</p> `,
                                  "Your request have been accepted"
                                  , res)

                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              })
            }

          })
        }
      })
    })
  },
  rejectMessage: function(req,res){
    Company.findOne({_id:req.params.id}).then(function(result){
      result.acceptedMessages.forEach(function(receptor){
        if(receptor.id === req.params.acceptedMessagesId){
          receptor.status = 'refused'
          result.save(function(err){
            if(err){
              res.send(err)
            }
            else{
              Company.findOne({_id:receptor.from}).then(function(result2){
                result2.letter.forEach(function(sender){
                  if(sender.id === receptor.letterId){
                    sender.status = 'refused'
                    result2.save(function(err){
                      if(err){
                        res.send(err)
                      }
                      else{
                        result.request.forEach(function(compRequest){
                          if(compRequest.id === sender.requestId){
                            compRequest.open = true
                            result.save(function(err){
                              if(err){
                                res.send(err)
                              }
                              else{
                                sendEmail(result2.email,
                                  "refused request",
                                  `  <div style="text-align:center"><img src='https://raw.githubusercontent.com/UKM-HUB/ukm_hub/master/ukmhub.png' style="width:40%;"/></div>
                                    <P>Dear <b>${result2.name}</b>,</P>
                                    <p><b>${result.name}</b> have refused your offer with title <b><i>"${sender.title}"</i></b> with message of "${sender.message}".</p>
                                    <p>for the request of <i><b>${receptor.title}</b></i>, contact <b>${result.name}</b> for futher information.</p>
                                    <br/>
                                    <p>regards,</p>
                                    <p>UKM HUB teams</p> `
                                   ,"Your request have been refused", res)

                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              })
            }

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
            sendEmail(
              req.body.email,
              "Your password succesfully reset",
              `
              <h1 style="text-align: center"><b>RESET PASSWORD SUCCESS</b></h1>
              <p style="text-align: center">your password has been successfully reset, here your new password : <b>${newPassword}</b></p>
              `,
              "Email found, and we are send you a new password to your email",
              res
            )
          })
        // email not found
        }else{
          res.json("Email not found")
        }
    })
  }
}
