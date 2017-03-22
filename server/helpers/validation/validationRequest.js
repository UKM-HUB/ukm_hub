module.exports = function(title, description, res, callback){
  if (title == '' || title == null) {
    res.json("title required")
  } else if (description == '' || description == null) {
    res.json("description required")
  } else{
    callback()
  }
}
