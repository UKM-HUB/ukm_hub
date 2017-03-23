module.exports = function(oldPassword, newPassword,confirmNewPassword, res, callback){
  if (oldPassword == '' || oldPassword == null) {
    res.json("old password required")
  } else if (newPassword == '' || newPassword == null) {
    res.json("new password required")
  }else if (confirmNewPassword == '' || confirmNewPassword == null) {
    res.json("confirm new password required")
  }
  else{
    callback()
  }
}
