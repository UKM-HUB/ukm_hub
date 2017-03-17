var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http');
var tampung ='';
chai.use(chaiHttp);

describe('tes routing company',function(){
  it('should return email of the registered company when post api/company/auth/register',function(done){
    chai.request('http://localhost:3000').post('/api/company/auth/register').send({email:'timogio99@gmail.com'}).end(function (err, res) {
    res.body.should.have.deep.property('email','timogio99@gmail.com')
    tampung = res.body._id
    done()
    })
  })
  

})
