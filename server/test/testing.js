var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ukmhub');
var modelCoop =require('../models/model_coop.js')
var modelCompany =require('../models/model_company.js')

modelCompany.remove({}, function(err, data){
  if (err) console.log(err);
  console.log(data);
})

modelCoop.remove({}, function(err, data){
  if (err) console.log(err);
  console.log(data);
})

require('../test-warehouse/company-test.js');
require('../test-warehouse/coop-test.js');
