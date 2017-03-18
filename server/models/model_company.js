// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var companySchema =  new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  category: [],
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
      types:String,
      to:String,
      from:String,
      table:[{
        item:String,
        price:String,
        quantity:String
      }],
      date: Date,
      valid:Boolean,
      description:String
    }
  ]
});

// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model('Company', companySchema);

// make this available to our users in our Node applications
module.exports = Company;
