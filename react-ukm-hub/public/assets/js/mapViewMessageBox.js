module.exports = {
  showCompanyMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-map-2',
      message: '<p style="margin-top:8px">This is your company location. Click other company to see their details</p>'
    }, {
      type: 'info',
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    })
  },
}
