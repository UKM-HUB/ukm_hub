var express = require('express');
var router = express.Router();
var company = require('../controllers/companies.controller.js')
const multer = require('multer')
var passwordHash = require('password-hash');
var passport = require('passport')
var verifyToken = require('../helpers/verifyToken');

router.post('/auth/register',company.register)
router.post('/auth/login', passport.authenticate('company-login'),company.login)
router.put('/:id/:acceptedMessagesId/acceptMessage',company.acceptMessage)
router.put('/:id/:acceptedMessagesId/rejectMessage',company.rejectMessage)
router.put('/:id',multer({ dest: './uploads/' }).single('uploads'),company.editProfile)
router.put('/:id/buyRequest',company.checkCorporate,multer({ dest: './uploads/' }).single('uploads'),company.createBuyRequest)
router.put('/:id/sellRequest',company.checkUkm,multer({ dest: './uploads/' }).single('uploads'),company.createSellRequest)
router.put('/:companyId/:requestId',company.changeReqStatus)
router.put('/:id/:otherId/:requestId/message',company.createLetter)
router.get('/:id/searchRequest',company.showRequest)
router.get('/:id/searchByCategory',company.showByCategories)
router.get('/:id',company.showOne)
router.get('/',company.showAll)
router.delete('/',company.deleteAll)
// reset password
router.post('/resetPassword',company.resetPassword)

module.exports = router;
