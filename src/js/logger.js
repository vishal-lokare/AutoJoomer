let username, password;

chrome.storage.local.get(('AutoJoomerUsername'), function (result) {
    username = result['AutoJoomerUsername'];
});

chrome.storage.local.get(('AutoJoomerPassword'), function (result) {
    password = result['AutoJoomerPassword'];
});

// checking current url
var url = window.location.href;

// move to login page if on home page
if (
    url == "https://lms.iiitkottayam.ac.in/" ||
    url == "https://lmsone.iiitkottayam.ac.in/"
) {
    document.getElementsByClassName("btn-login-top")[1].click();
}

// fill credentials and click button
if (url.includes("login/index.php")) {
    setTimeout(() => {
        if (typeof username !== 'undefined' && typeof password !== 'undefined') {
            document.getElementById("username").value = username;
            document.getElementById("password").value = password;
            document
                .getElementsByClassName("btn btn-primary btn-block")[0]
                .click();
        } else {
            alert("Please enter your credentials in options page");
        }
    }, 1000);

}

// fill credentials on wifi authentication page
if (url.includes("fgtauth")) {
    setTimeout(() => {
        if (typeof username !== 'undefined' && typeof password !== 'undefined') {
            document.getElementById("ft_un").value = username;
            document.getElementById("ft_pd").value = password;
            document
                .getElementsByClassName("fer")[0]
                .getElementsByTagName("input")[0]
                .click();
        } else {
            alert('Please set username and password in extension settings');
        }
    }, 1000);
}