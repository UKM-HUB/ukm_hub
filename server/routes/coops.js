var express = require('express');
var router = express.Router();
var coopController = require('../controllers/coop.controller.js')
var passwordHash = require('password-hash');
var passport = require('passport')
var verifyToken = require('../helpers/verifyToken');

/* http://localhost:3000/api/coop/login | login */
router.post('/login', passport.authenticate('coop-login'),coopController.login)
/* http://localhost:3000/api/coop/register | register new coop just for development */
router.post('/register', coopController.register)
/* http://localhost:3000/api/coop/ | get all data coop */
router.get('/', verifyToken.verify, coopController.getAllCoop)
/* http://localhost:3000/api/coop/verify/:id | coopController.verify */
router.put('/verify/:id', verifyToken.verify, coopController.verify)
/* http://localhost:3000/api/coop/unverify/:id | coopController.unverify */
router.put('/unverify/:id', verifyToken.verify, coopController.unverify)

module.exports = router;
