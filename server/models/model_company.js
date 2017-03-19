// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var companySchema =  new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
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
  created_at: Date,
  images: String,
  updated_at: Date,
  letter:[
    {
      to:String,
      from:String,
      title:String,
      date: Date,
      status:String,
      message:String
    }
  ],
  acceptedMessages:[
    {
      companyId:String,
      letterId:String,
    }
  ]

});

// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model('Company', companySchema);

// make this available to our users in our Node applications
module.exports = Company;
