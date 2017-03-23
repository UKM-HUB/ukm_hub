// grab the things we need
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

// model validation
var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'your email seem not valid'
  })
];

// create a schema
var companySchema =  new Schema({
  name: String,
  email: { type: String, required: [true, 'you must insert your email'], validate: emailValidator},
  password: { type: String, required: [true, 'you must insert your password'] },
  category: [],
  verified:Boolean,
  edited:Boolean,
  type: String,
  location:{
    lat:String,
    lng:String
  },
  request:[{
    types:String,
    title:String,
    price:Number,
    description:String,
    images:String,
    open:Boolean
  }],
  description: String,
  website: String,
  address:String,
  phone:String,
  images: String,
  created_at: Date,
  updated_at: Date,
  letter:[
    {
      to:String,
      from:String,
      title:String,
      requestId:String,
      date: Date,
      status:String,
      message:String
    }
  ],
  acceptedMessages:[
    {
      from:String,
      title:String,
      sender:String,
      requestTitle:String,
      letterId:String,
      date:Date,
      status:String,
      message:String
    }
  ]

});

// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model('Company', companySchema);

// make this available to our company in our Node applications
module.exports = Company;
