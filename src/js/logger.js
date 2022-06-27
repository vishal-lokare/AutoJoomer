// RETRIEVING USERNAME AND PASSWORD FROM SCRIPT.JS

let username, password;
chrome.runtime.sendMessage("getUsername", (response) => {
  username = response;
});
chrome.runtime.sendMessage("getPassword", (response) => {
  password = response;
});

// IMPLEMENTING COOKIE TO KEEP TRACK OF FAILED LOGIN ATTEMPTS

// create cookie with name, value and seconds before it expires
function setCookie(cookieName, cookieValue, secondsForExpiry) {
  var dateObj = new Date();
  dateObj.setTime(dateObj.getTime() + secondsForExpiry * 1000); // expiryTime = currentTime + secondsForExpiry
  var expiryTime = dateObj.toUTCString();
  document.cookie = `${cookieName}=${cookieValue}; expires=${expiryTime}; path=/`;
}

// get cookie value using name
function getCookie(findCookie) {
  var allCookies = document.cookie; // returns string like "name1=value1; name2=value2; name3=value3; ....."
  allCookies = decodeURIComponent(allCookies); // decoding the cookie string in case of special characters
  allCookies = allCookies.split(";"); // creating list of cookies
  for (let cookie of allCookies) {
    [cookieName, cookieValue] = [...cookie.split("=")]; // splitting cookie data into name and value from " name=value"
    if (cookieName.trim() == findCookie) {
      return parseInt(cookieValue, 10); // returning cookie value after converting to decimal integer
    }
  }
  return 0;
}

// HANDLING FAILED LOGIN

function failedLogin() {
  if (document.getElementsByClassName("loginerrors mt-3")[0]) {
    alert(
      "Incorrect credentials provided in AutoJoomer. Please correct and try again."
    );
    return true;
  }
  return false;
}

// DRIVER CODE

$(document).ready(function () {
  var numOfAttempts = getCookie("iiitkLoginAttempts");
  if (numOfAttempts <= 0) {
    setCookie("iiitkLoginAttempts", 1, 5);
  } else if (numOfAttempts == 3 && failedLogin()) {
    return;
  } else {
    setCookie("iiitkLoginAttempts", numOfAttempts + 1);
  }

  // reset cookie if attempts > 3
  if (numOfAttempts > 3) {
    setCookie("iiitkLoginAttempts", 0);
    numOfAttempts = 0;
  }

  // checking current url and acting accordingly
  var url = window.location.href;

  // move to login page if on home page
  if (
    url == "https://lms.iiitkottayam.ac.in/" ||
    url == "https://lmsone.iiitkottayam.ac.in/"
  ) {
    document.getElementsByClassName("btn-login")[0].click();
  }

  // fill credentials and click button
  if (
    url == "https://lms.iiitkottayam.ac.in/login/index.php" ||
    url == "https://lms.iiitkottayam.ac.in/login/index.php/#" ||
    url == "https://lmsone.iiitkottayam.ac.in/login/index.php" ||
    url == "https://lmsone.iiitkottayam.ac.in/login/index.php/#"
  ) {
    document.getElementById("username").value = username;
    document.getElementById("password").value = password;
    document
      .getElementsByClassName("btn btn-primary btn-block mt-3")[0]
      .click();
  }

  // click join button on classes opened by autojoomer
  if (url.includes("?reason=AutoJoomer")) {
    var joinBtn = document.getElementById("join_button_input");
    var timerId = setInterval(function () {
      if (joinBtn) {
        joinBtn.click();
        clearInterval(timerId);
      } else {
        joinBtn = document.getElementById("join_button_input");
      }
    }, 1000);
  }

  // fill credentials on wifi authentication page
  if (url.includes("fgtauth")) {
    document.getElementById("ft_un").value = username;
    document.getElementById("ft_pd").value = password;
    document
      .getElementsByClassName("fer")[0]
      .getElementsByTagName("input")[0]
      .click();
  }
});
