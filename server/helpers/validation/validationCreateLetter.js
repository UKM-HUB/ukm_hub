module.exports = function(to, from, requestId, message,  res, callback){
  if (to == '' || to == null) {
    res.json("Email destination required")
  } else if (from == '' || from == null) {
    res.json("Email origin required")
  } else if (requestId == '' || requestId == null) {
    res.json("Request Id required")
  } else if (message == '' || message == null) {
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
