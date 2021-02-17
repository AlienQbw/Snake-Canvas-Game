function saveCookie(userName, score, event) {
  document.cookie = `username=${userName} ${score}`;
  document.save_score_form.submit();
}

function removeCookies() {
  var res = document.cookie;
  var multiple = res.split(";");
  for (var i = 0; i < multiple.length; i++) {
    var key = multiple[i].split("=");
    document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
  }
}
