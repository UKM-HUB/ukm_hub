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
  it('should return updated company profile json when put api/company/:id',function(done){
    chai.request('http://localhost:3000').put(`/api/company/${tampung}`).send({
    name:'PT.SENTOSA',
    type:'corporate',
    category:'["sepatu","baju"]',
    lat:'-999',
    lng:'-999',
    website:'timocodex.com',
    address:'taman bukit indah raya',
    phone:'081276861447',
    description:'ini adalah toko',
    })
    .end(function (err, res) {
    res.body.should.have.deep.property('name','PT.SENTOSA')
    done()
    })
  })
  it('should delete all company when delete api/company/',function(done){
    chai.request('http://localhost:3000').delete(`/api/company`)
    .end(function (err, res) {
    res.text.should.equal('data berhasil dihapus')
    done()
    })
  })
})
