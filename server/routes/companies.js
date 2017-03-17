var express = require('express');
var router = express.Router();
var company = require('../controllers/companies.controller.js')
const multer = require('multer')

router.post('/auth/register',company.register)
router.put('/:id',multer({ dest: './uploads/' }).single('uploads'),company.editProfile)
router.get('/',company.showAll)
router.delete('/',company.deleteAll)
module.exports = router;
