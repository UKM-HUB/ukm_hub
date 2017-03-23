var express = require('express');
var router = express.Router();
var company = require('../controllers/companies.controller.js')
var passwordHash = require('password-hash');
var passport = require('passport')
var verifyToken = require('../helpers/verifyToken');
const multer = require('multer');
var AWS = require('aws-sdk');

// Amazon s3 config
const s3 = new AWS.S3();

AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    subregion: 'ap-southeast-1',
  });

const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

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
//change password
router.put('/:id/changePassword',company.changePassword)
/* upload profile image */
router.post('/upload/editProfile/:randomImageKey', upload.single('filePic'), (req, res) => {
// req.file is the 'theseNamesMustMatch' file
  console.log("masuk api");
  console.log(req.file.originalname);
    s3.putObject({
      Bucket: process.env.BUCKET_NAME,
      Key: 'images/'+req.params.randomImageKey + req.file.originalname,
      Body: req.file.buffer,
      ACL: 'public-read', // your permisions
    }, (err, data) => {
      if (err) return res.status(400).send(err);
      console.log('OK MASUK DATANYA');
      console.log(data);
      res.send(data);
    })
})

module.exports = router;
