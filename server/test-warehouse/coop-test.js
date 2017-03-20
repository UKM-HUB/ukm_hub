var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('test routing coop',function(){
  // testing register coop
  it('should return email of the register coop when post api/coop/register',function(done){
    chai
    .request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com')
    .post('/api/coop/register')
    .send({email:'alexanderhendrawan@gmail.com', password: 'alexander'})
    .end(function (err, res) {
      // checking value
      res.body.should.have.deep.property('email','alexanderhendrawan@gmail.com')
      done()
    })
  })

  // testing login coop
  it('should return email of the login coop when post api/coop/login',function(done){
    chai
    .request('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com')
    .post('/api/coop/login')
    .send({email:'alexanderhendrawan@gmail.com', password: 'alexander'})
    .end(function (err, res) {
      // checking value
      res.body.should.have.deep.property('token')
      done()
    })
  })

})
