var jwt = require('jsonwebtoken');

var verifyToken = {
  verify: function(req, res, next){
    if (req.headers.token == 'null' || req.headers.token == undefined) {
      res.json("you don't have access token")
    }else{
      if (jwt.verify(req.headers.token, 'ukmhub')) {
        next()
      }else {
        res.json("token already expried")
      }
    }
  }
}

module.exports = verifyToken
