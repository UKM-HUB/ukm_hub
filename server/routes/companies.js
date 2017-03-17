var express = require('express');
var router = express.Router();
var company = require('../controllers/companies.controller.js')

router.post('/auth/register',company.register)
router.get('/',company.showAll)
router.delete('/',company.deleteAll)
module.exports = router;
