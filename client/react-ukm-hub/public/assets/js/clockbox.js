tday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
tmonth = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')

function GetClock () {
  var d = new Date()
  var nday = d.getDay(),nmonth = d.getMonth(),ndate = d.getDate(),nyear = d.getYear()

  if (nyear < 1000) nyear += 1900

  var nhour = d.getHours(),nmin = d.getMinutes(),nsec = d.getSeconds(),ap
  var date = ''

  if (nhour == 0) {ap = ' AM';nhour = 12;}
  else if (nhour < 12) {ap = ' AM';}
  else if (nhour == 12) {ap = ' PM';}
  else if (nhour > 12) {ap = ' PM';nhour -= 12;}

  if (ndate == 1) {date = 'st';}
  else if (ndate == 2) {date = 'nd';}
  else if (ndate == 3) {date = 'rd';}
  else if (ndate >= 4 && ndate <= 20) {date = 'th';}
  else if (ndate == 21) {date = 'st';}
  else if (ndate == 22) {date = 'nd';}
  else if (ndate == 23) {date = 'rd';}
  else if (ndate >= 24 && ndate <= 31) {date = 'th';}

  if (nmin <= 9) nmin = '0' + nmin
  if (nsec <= 9) nsec = '0' + nsec

  document.getElementById('clockbox').innerHTML = '' + tday[nday] + ', ' + ndate + date + ' ' + tmonth[nmonth] + ' ' + nyear + ', ' + nhour + ':' + nmin + ':' + nsec + ap + ''
}

window.onload = function () {
  GetClock()
  setInterval(GetClock, 1000)
}
