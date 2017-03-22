module.exports = function(title, price, description,  res, callback){
  if (title == '' || title == null) {
    res.json("title required")
  } else if (price == '' || price == null) {
    res.json("price required")
  } else if (description == '' || description == null) {
    res.json("description required")
  } else{
    callback()
  }
}
