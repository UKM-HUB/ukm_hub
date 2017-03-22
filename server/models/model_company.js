// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var companySchema =  new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { type: String, required: true},
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
