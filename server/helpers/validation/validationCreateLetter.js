module.exports = function(message,  res, callback){
 if (message == '' || message == null) {
    res.json("Message required")
  } else{
    callback()
  }
}

/*
  validationCreateLetter
  =======================
  Usage
  =======================
  validationCreateLetter(to, from, requestId, message,  res, callback)
*/
