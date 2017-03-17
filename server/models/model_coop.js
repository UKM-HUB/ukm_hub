var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  email: { type: String, required: true, unique: true },
  password: String
});

// the schema is useless so far
// we need to create a model using it
var Coop = mongoose.model('Coop', coopSchema);

// make this available to our Coop in our Node applications
module.exports = Coop;
