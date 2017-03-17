var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http');
var tampung ='';
chai.use(chaiHttp);

describe('test routing coop',function(){
  // testing login coop
  it('should return email of the login coop when post api/coop/login',function(done){
    chai
    .request('http://localhost:3000')
    .post('/api/coop/login')
    .send({email:'timogio99@gmail.com', password: 'timogio99'})
    .end(function (err, res) {
      // checking value
      res.body.should.have.deep.property('email','timogio99@gmail.com')
      done()
    })
  })


})
