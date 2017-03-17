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
  request: [{
    type:String,
    price:String,
    description: String,
    images:String
  }],
  description: String,
  website: String,
  address: String,
  phone: String,
  verified: Boolean,
  created_at: Date,
  images: String,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Company = mongoose.model('Company', companySchema);

// make this available to our users in our Node applications
module.exports = Company;
