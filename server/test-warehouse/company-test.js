var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var tampung = ''
var tampung2 = ''
var tampung3 = ''
var tampung4 =''
chai.use(chaiHttp)

const app = require ('../app')

describe('tes routing company', function () {
  it('Test API when delete api/company/', function (done) {
    chai.request(app).delete(`/api/company`)
    .end(function (err, res) {
      res.text.should.equal('data berhasil dihapus')
      done()
    })
  })
  it('should return email of the registered company when post api/company/auth/register', function (done) {
    chai.request(app).post('/api/company/auth/register').send({email: 'timogio99@gmail.com', password: '123456'}).end(function (err, res) {
      res.body.should.have.deep.property('email', 'timogio99@gmail.com')
      res.body.should.have.deep.property('edited', false)
      res.body.should.have.deep.property('verified', false)
      tampung = res.body.companyId
      done()
    })
  })
  it('should return email of the second registered company when post api/company/auth/register', function (done) {
    chai.request(app).post('/api/company/auth/register').send({email: 'dhegana@gmail.com', password: '123456'}).end(function (err, res) {
      res.body.should.have.deep.property('email', 'dhegana@gmail.com')
      tampung2 = res.body.companyId
      done()
    })
  })
  it('should not update  registered company type to corporate when user does not input the name of company put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung}`).send({
      name: '',
      type: 'corporate',
      category: ['book', 'game'],
      lat: '-12.043333',
      lng: '-77.028333',
      website: 'timocodex.com',
      address: 'Taman bukit indah raya IV no 45, Bukin Indah Sukajadi',
      phone: '081276861447',
      description: 'timo corp menjual segala kebutuhan gamer mulai dari konsol sampai guidebook '
    })
    .end(function (err, res) {
      res.text.should.equal('"name required"')
      done()
    })
  })
  it('should not update  registered company type to corporate when user does not select the type of company put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung}`).send({
      name: 'Timo GAME SHOP',
      type: '',
      category: ['book', 'game'],
      lat: '-12.043333',
      lng: '-77.028333',
      website: 'timocodex.com',
      address: 'Taman bukit indah raya IV no 45, Bukin Indah Sukajadi',
      phone: '081276861447',
      description: 'timo corp menjual segala kebutuhan gamer mulai dari konsol sampai guidebook '
    })
    .end(function (err, res) {
      res.text.should.equal('"type required"')
      done()
    })
  })
  it('should not update  registered company type to corporate when user does not select the category of company put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung}`).send({
      name: 'TIMO GAME SHOP',
      type: 'corporate',
      category: '',
      lat: '-12.043333',
      lng: '-77.028333',
      website: 'timocodex.com',
      address: 'Taman bukit indah raya IV no 45, Bukin Indah Sukajadi',
      phone: '081276861447',
      description: 'timo corp menjual segala kebutuhan gamer mulai dari konsol sampai guidebook '
    })
    .end(function (err, res) {
      res.text.should.equal('"category required"')
      done()
    })
  })
  it('should not update  registered company type to corporate when user does not select the latitude of company put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung}`).send({
      name: 'Timocodex shop',
      type: 'corporate',
      category: ['book', 'game'],
      lat: '',
      lng: '-77.028333',
      website: 'timocodex.com',
      address: 'Taman bukit indah raya IV no 45, Bukin Indah Sukajadi',
      phone: '081276861447',
      description: 'timo corp menjual segala kebutuhan gamer mulai dari konsol sampai guidebook '
    })
    .end(function (err, res) {
      res.text.should.equal('"lat required"')
      done()
    })
  })
  it('should not update  registered company type to corporate when user does not select the longitude of company put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung}`).send({
      name: 'Timocodex shop',
      type: 'corporate',
      category: ['book', 'game'],
      lat: '-12.043333',
      lng: '',
      website: 'timocodex.com',
      address: 'Taman bukit indah raya IV no 45, Bukin Indah Sukajadi',
      phone: '081276861447',
      description: 'timo corp menjual segala kebutuhan gamer mulai dari konsol sampai guidebook '
    })
    .end(function (err, res) {
      res.text.should.equal('"lng required"')
      done()
    })
  })
  it('should not update  registered company type to corporate when user does not input the full address of company put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung}`).send({
      name: 'Timocodex shop',
      type: 'corporate',
      category: ['book', 'game'],
      lat: '-12.043333',
      lng: '-77.028333',
      website: 'timocodex.com',
      address: '',
      phone: '081276861447',
      description: 'timo corp menjual segala kebutuhan gamer mulai dari konsol sampai guidebook '
    })
    .end(function (err, res) {
      res.text.should.equal('"address required"')
      done()
    })
  })
  it('should not update  registered company type to corporate when user does not input the full address of company put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung}`).send({
      name: 'Timocodex shop',
      type: 'corporate',
      category: ['book', 'game'],
      lat: '-12.043333',
      lng: '-77.028333',
      website: 'timocodex.com',
      address: 'Bukit indah raya',
      phone: '081276861447',
      description: ''
    })
    .end(function (err, res) {
      res.text.should.equal('"description required"')
      done()
    })
  })
  it('should update first registered company type to corporate when put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung}`).send({
      name: 'TIMO GAME SHOP',
      type: 'corporate',
      category: ['book', 'game'],
      lat: '-12.043333',
      lng: '-77.028333',
      website: 'http://www.timocodex.com',
      address: 'Taman bukit indah raya IV no 45, Bukin Indah Sukajadi',
      phone: '081276861447',
      description: 'timo corp menjual segala kebutuhan gamer mulai dari konsol sampai guidebook'
    })
    .end(function (err, res) {

    res.body.should.have.deep.property('name','TIMO GAME SHOP')
    res.body.should.have.deep.property('type','corporate')
    res.body.location.should.have.deep.property('lat','-12.043333')
    res.body.location.should.have.deep.property('lng','-77.028333')
    res.body.should.have.deep.property('website','http://www.timocodex.com')
    res.body.should.have.deep.property('address','Taman bukit indah raya IV no 45, Bukin Indah Sukajadi')
    res.body.should.have.deep.property('description','timo corp menjual segala kebutuhan gamer mulai dari konsol sampai guidebook')
    done()

    })
  })
  it('should update second registered company type to ukm when put api/company/:id', function (done) {
    chai.request(app).put(`/api/company/${tampung2}`).send({
      name: 'GANA GAME DEVELOPER',
      type: 'ukm',
      category: ['game'],
      lat: '-12.043333',
      lng: '-77.028333',
      website: 'http://www.dhegana.com',
      address: 'Jalan wastu kencana no 100 blok Z',
      phone: '081346758765',
      description: 'Gana Game dev adalah pengembang game konsol dan web'
    })
    .end(function (err, res) {

      res.body.should.have.deep.property('name','GANA GAME DEVELOPER')
      res.body.should.have.deep.property('type','ukm')
      res.body.location.should.have.deep.property('lat','-12.043333')
      res.body.location.should.have.deep.property('lng','-77.028333')
      res.body.should.have.deep.property('website','http://www.dhegana.com')
      res.body.should.have.deep.property('address','Jalan wastu kencana no 100 blok Z')
      res.body.should.have.deep.property('description','Gana Game dev adalah pengembang game konsol dan web')
    done()

    })
  })
  it('should return all company with type ukm with same category when corporate search By Category with get api/company/:id/searchByCategory', function (done) {
    chai.request(app).get(`/api/company/${tampung}/searchByCategory`)
    .end(function (err, res) {
      res.body[0].should.have.deep.property('type', 'ukm')
      done()
    })
  })
  it('should return all company with type corporate with same category when ukm search By Category with get api/company/:id/searchByCategory', function (done) {
    chai.request(app).get(`/api/company/${tampung2}/searchByCategory`)
    .end(function (err, res) {
      res.body[0].should.have.deep.property('type', 'corporate')
      done()
    })
  })
  it('ukm should not create buy request when  put api/company/:id/buyRequest', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/buyRequest`).send({
      title: 'coba coba',
      price: 500000,
      description: 'nyoba terus'
    })
    .end(function (err, res) {
      res.text.should.equal('your company is not a corporate type')
      done()
    })
  })

  it('corporate should not create sell request when  put api/company/:id/sellRequest', function (done) {
    chai.request(app).put(`/api/company/${tampung}/sellRequest`).send({
      title: 'coba coba',
      price: 500000,
      description: 'nyoba terus'
    })
    .end(function (err, res) {
      res.text.should.equal('your company is not a ukm type')
      done()
    })
  })
  it('corporate should not create buy Request if the title is blank when put api/company/:id/buyRequest', function (done) {
    chai.request(app).put(`/api/company/${tampung}/buyRequest`).send({
      title: '',
      price: 9999,
      description: 'dibutuhkan ukm yang bergerak di bidang game developer untuk mengembangkan sebuah game konsol ps4 ber genre RPG yang sudah kami buat konsepnya'
    })
    .end(function (err, res) {
      res.text.should.equal('"title required"')
      done()
    })
  })
  it('corporate should not create buy Request if the description is blank when put api/company/:id/buyRequest', function (done) {
    chai.request(app).put(`/api/company/${tampung}/buyRequest`).send({
      title: 'COBA',
      price: 9999,
      description: ''
    })
    .end(function (err, res) {
      res.text.should.equal('"description required"')
      done()
    })
  })
  it('corporate should create buy Request when put api/company/:id/buyRequest', function (done) {
    chai.request(app).put(`/api/company/${tampung}/buyRequest`).send({
      title: 'dicari game developer sejati',
      price: 9999,
      description: 'dibutuhkan ukm yang bergerak di bidang game developer untuk mengembangkan sebuah game konsol ps4 ber genre RPG yang sudah kami buat konsepnya'
    })
    .end(function (err, res) {
      res.body.request.should.lengthOf(1)
      done()
    })
  })
  it('ukm should create sell Request when put api/company/:id/sellRequest', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/sellRequest`).send({
      title: 'Menawarkan jasa game developer',
      price: 9999,
      description: 'jasa game developer konsol (xbox one , ps4) murah meriah, open for request'
    })
    .end(function (err, res) {
      res.body.request.should.lengthOf(1)
      tampung3 = res.body.request[0]._id
      done()
    })
  })
  it('change status of request(buy or sell) to false when put api/company/:companyId/:requestId', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/${tampung3}`)
    .end(function (err, res) {
      res.body.request[0].should.have.deep.property('open', false)
      done()
    })
  })
  it('change status of request(buy or sell) to true when put api/company/:companyId/:requestId', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/${tampung3}`)
    .end(function (err, res) {
      res.body.request[0].should.have.deep.property('open', true)
      done()
    })
  })
  it('should not create letter/message if message left blank when put api/company/:id/:otherId/:requestId/message', function (done) {
    chai.request(app).put(`/api/company/${tampung}/${tampung2}/${tampung3}/message`).send({
      title: 'reply to - Menawarkan jasa game developer',
      requestTitle: 'Menawarkan jasa game developer',
      message: ''
    })
    .end(function (err, res) {
      res.text.should.equal('"Message required"')
      done()
    })
  })

  it('should create letter/message when put api/company/:id/:otherId/:requestId/message', function (done) {
    chai.request(app).put(`/api/company/${tampung}/${tampung2}/${tampung3}/message`).send({
      title: 'reply to - Menawarkan jasa game developer',
      requestTitle: 'Menawarkan jasa game developer',
      message: 'saya tertarik dengan penawaran anda, berminat berkomunikasi lebih lanjut untuk bekerjasama dengan anda'
    })
    .end(function (err, res) {
      res.body.should.have.deep.property('message', "Email has been sent")
      done()
    })
  })
  it('should get company details when get api/company/:id/', function (done) {
    chai.request(app).get(`/api/company/${tampung2}`)
    .end(function (err, res) {
      tampung4 = res.body.acceptedMessages[0]._id
      res.body.should.have.deep.property('email', "dhegana@gmail.com")
      done()
    })
  })
  it('should accept the message from another company  when put api/company/:id/:acceptedMessagesId/acceptMessage', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/${tampung4}/acceptMessage`)
    .end(function (err, res) {
      res.body.should.have.deep.property('message', "Email has been sent")
      done()
    })
  })
  it('should reject the message from another company  when put api/company/:id/:acceptedMessagesId/rejecttMessage', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/${tampung4}/rejectMessage`)
    .end(function (err, res) {
      res.body.should.have.deep.property('message', "Email has been sent")
      done()
    })
  })
  it('should reset password of company when  when post api/company/resetPassword', function (done) {
    chai.request(app).post(`/api/company/resetPassword`).send({
      email:"timogio99@gmail.com"
    })
    .end(function (err, res) {

      res.body.should.have.deep.property('message', "Email has been sent")
      done()
    })
  })
  it('should not change password of company if old password is left blank when  when put api/company/:id/changePassword', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/changePassword`).send({
      oldPassword:"",
      newPassword:"234567",
      confirmNewPassword:"234567"
    })
    .end(function (err, res) {
      res.text.should.equal('"old password required"')
      done()
    })
  })
  it('should not change password of company if new password is left blank when  when put api/company/:id/changePassword', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/changePassword`).send({
      oldPassword:"123456",
      newPassword:"",
      confirmNewPassword:"234567"
    })
    .end(function (err, res) {
      res.text.should.equal('"new password required"')
      done()
    })
  })
  it('should not change password of company if confirm new password is left blank when  when put api/company/:id/changePassword', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/changePassword`).send({
      oldPassword:"123456",
      newPassword:"234567",
      confirmNewPassword:""
    })
    .end(function (err, res) {
      res.text.should.equal('"confirm new password required"')
      done()
    })
  })
  it('should not change password of company if old password is wrong when  when put api/company/:id/changePassword', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/changePassword`).send({
      oldPassword:"12345678",
      newPassword:"234567",
      confirmNewPassword:"234567"
    })
    .end(function (err, res) {
      res.text.should.equal('Your old password is not the same as your input!')
      done()
    })
  })
  it('should not change password of company if confirmation of new password is wrong when  when put api/company/:id/changePassword', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/changePassword`).send({
      oldPassword:"123456",
      newPassword:"23456789",
      confirmNewPassword:"234567"
    })
    .end(function (err, res) {
      res.text.should.equal('your new password not match with the confirmation password!')
      done()
    })
  })
  it('should change password of company when  when put api/company/:id/changePassword', function (done) {
    chai.request(app).put(`/api/company/${tampung2}/changePassword`).send({
      oldPassword:"123456",
      newPassword:"234567",
      confirmNewPassword:"234567"
    })
    .end(function (err, res) {
      res.text.should.equal('Your password has been changed!')
      done()
    })
  })
})
