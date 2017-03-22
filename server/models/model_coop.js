var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

// mongoose validator
var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'your email seem not valid'
  })
];

// create a schema
var coopSchema =  new Schema({
  name: String,
  location:{
    lat:String,
    lng:String
  },
  description: String,
  phone: String,
  image: String,
  email: { type: String, required: [true, 'you must insert your email'], validate: emailValidator},
  password: { type: String, required: [true, 'you must insert your password'] }
});

// the schema is useless so far
// we need to create a model using it
var Coop = mongoose.model('Coop', coopSchema);

// make this available to our Coop in our Node applications
module.exports = Coop;
