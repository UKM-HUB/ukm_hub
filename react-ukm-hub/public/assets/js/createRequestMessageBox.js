module.exports = {
  showTitleMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-close',
      message: '<p style="margin-top:8px">Please input the title</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showRequestMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-close',
      message: '<p style="margin-top:8px">Request message is required</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showTypeMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-close',
      message: '<p style="margin-top:8px">Please update your company profile type</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showSubmitMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-cloud-download',
      message: '<p style="margin-top:8px">Request has been sent</p>'
    }, {
      type: 'info',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  }
}
