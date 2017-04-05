module.exports = {
  showRegisterInvalid: function (from, align) {
    $.notify({
      icon: 'pe-7s-delete-user',
      message: '<p style="margin-top:8px">Please input valid email</p>'

    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showPasswordInvalid: function (from, align) {
    $.notify({
      icon: 'pe-7s-delete-user',
      message: '<p style="margin-top:8px">Password must be more than 5 character</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showErrorLogin: function (from, align) {
    $.notify({
      icon: 'pe-7s-delete-user',
      message: '<p style="margin-top:8px">Invalid email/password</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  }
}
