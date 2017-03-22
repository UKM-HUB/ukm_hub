module.exports = function(name, type, category, lat, lng, address, phone, description, res, callback){
  if (name == '' || name == null) {
    res.json("name required")
  } else if (type == '' || type == null) {
    res.json("type required")
  } else if (category == '' || category == null) {
    res.json("category required")
  } else if (lat == '' || lat == null) {
    res.json("lat required")
  } else if (lng == '' || lng == null) {
    res.json("lng required")
  } else if (address == '' || address == null) {
    res.json("address required")
  } else if (phone == '' || phone == null) {
    res.json("phone required")
  } else if (description == '' || description == null) {
    res.json("description required")
  } else{
    callback()
  }
}
