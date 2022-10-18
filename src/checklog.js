chrome.storage.local.get(["AutoJoomerUsername"], function (result) { //checks if user has logged in to show login page on opening popup
  if (!result.AutoJoomerUsername) {
    window.open("pages/login/login.html", "_self");
  } else {
    
  }
});
