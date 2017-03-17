var express = require('express');
var router = express.Router();
var company = require('../controllers/companies.controller.js')
const multer = require('multer')
var passwordHash = require('password-hash');
var passport = require('passport')
var verifyToken = require('../helpers/verifyToken');

router.post('/auth/register',company.register)
router.post('/auth/login', passport.authenticate('company-login'),company.login)
router.put('/:id',multer({ dest: './uploads/' }).single('uploads'),company.editProfile)
router.get('/:id/searchByCategory',company.showByCategories)
router.get('/:id',company.showOne)
router.get('/',company.showAll)
router.delete('/',company.deleteAll)
module.exports = router;
