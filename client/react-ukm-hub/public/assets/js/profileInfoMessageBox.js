module.exports = {
  showNameMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-attention',
      message: '<p style="margin-top:8px">Company name required</p>'
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
      icon: 'pe-7s-attention',
      message: '<p style="margin-top:8px">Please choose your company type</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showCategoryMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-attention',
      message: '<p style="margin-top:8px">Company must have at least 1 category</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showMarkerMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-attention',
      message: '<p style="margin-top:8px">Please update your company location in the Google Maps</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showAddressMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-attention',
      message: '<p style="margin-top:8px">Company address detail required</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showDescriptionMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-attention',
      message: '<p style="margin-top:8px">Company description detail required</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showPhoneMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-attention',
      message: '<p style="margin-top:8px">Company phone number required</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showUpdateSuccessMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-id',
      message: '<p style="margin-top:8px">Company update Success</p>'
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
