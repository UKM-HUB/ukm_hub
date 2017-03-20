var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http');
var tampung ='';
var tampung2 ='';
var tampung3 ='';
chai.use(chaiHttp);


describe('tes routing company',function(){
  it('should return email of the registered company when post api/company/auth/register',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').post('/api/company/auth/register').send({email:'timogio99@gmail.com',password:'yes123'}).end(function (err, res) {
    res.body.should.have.deep.property('email','timogio99@gmail.com')
    tampung = res.body.companyId
    done()
    })
  })
  it('should return email of the second registered company when post api/company/auth/register',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').post('/api/company/auth/register').send({email:'alex@gmail.com',password:'yes123'}).end(function (err, res) {
    res.body.should.have.deep.property('email','alex@gmail.com')
    tampung2 = res.body.companyId
    done()
    })
  })
  it('should update first registered company type to corporate when put api/company/:id',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').put(`/api/company/${tampung}`).send({
    name:'PT.SENTOSA',
    type:'corporate',
    category:'["sepatu","baju"]',
    lat:'-12.043333',
    lng:'-77.028333',
    website:'timocodex.com',
    address:'taman bukit indah raya',
    phone:'081276861447',
    description:'ini adalah toko',
    })
    .end(function (err, res) {
    res.body.should.have.deep.property('type','corporate')
    done()
    })
  })
  it('should update second registered company type to ukm when put api/company/:id',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').put(`/api/company/${tampung2}`).send({
    name:'SANTOSA jaya',
    type:'ukm',
    category:'["sepatu"]',
    lat:'-12.043333',
    lng:'-77.028333',
    website:'santosa.com',
    address:'taman bukit indah raya',
    phone:'081276861447',
    description:'ini adalah toko',
    })
    .end(function (err, res) {
    res.body.should.have.deep.property('type','ukm')
    done()
    })
  })
  it('should return all company with type ukm with same category when corporate search By Category with get api/company/:id/searchByCategory',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').get(`/api/company/${tampung}/searchByCategory`)
    .end(function (err, res) {
    res.body[0].should.have.deep.property('type','ukm')
    done()
    })
  })
  it('should return all company with type corporate with same category when ukm search By Category with get api/company/:id/searchByCategory',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').get(`/api/company/${tampung2}/searchByCategory`)
    .end(function (err, res) {
    res.body[0].should.have.deep.property('type','corporate')
    done()
    })
  })
  it('ukm should not create buy request when  put api/company/:id/buyRequest',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').put(`/api/company/${tampung2}/buyRequest`).send({
      title:"coba coba",
      price:500000,
      description:"nyoba terus",
    })
    .end(function (err, res) {
    res.text.should.equal("your company is not a corporate type")
    done()
    })
  })
  it('corporate should not create sell request when  put api/company/:id/sellRequest',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').put(`/api/company/${tampung}/sellRequest`).send({
      title:"coba coba",
      price:500000,
      description:"nyoba terus",
    })
    .end(function (err, res) {
    res.text.should.equal("your company is not a ukm type")
    done()
    })
  })
  it('corporate should create buy Request when put api/company/:id/buyRequest',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').put(`/api/company/${tampung}/buyRequest`).send({
      title:"dicari bahan kulit murah",
      price:500000,
      description:"dibutuhkan bahan kulit murah berkualitas internasional",
    })
    .end(function (err, res) {
    res.body.request.should.lengthOf(1)
    done()
    })
  })
  it('ukm should create sell Request when put api/company/:id/sellRequest',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').put(`/api/company/${tampung2}/sellRequest`).send({
      title:"dijual bahan kulit murah",
      price:500000,
      description:"dijual bahan kulit murah berkualitas internasional",
    })
    .end(function (err, res) {
    res.body.request.should.lengthOf(1)
    tampung3 = res.body.request[0]._id
    done()
    })
  })
  it('change status of request(buy or sell) when put api/company/:companyId/:requestId',function(done){
    chai.request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com').put(`/api/company/${tampung2}/${tampung3}`)
    .end(function (err, res) {
    res.body.request[0].should.have.deep.property('open',false)
    done()
    })
  })


})
