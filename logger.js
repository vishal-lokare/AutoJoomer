var replaceusername, replacepassword;

chrome.runtime.sendMessage('getUsername', (username) => {
    console.log('received username', username);
    replaceusername = username;
});

chrome.runtime.sendMessage('getPassword', (password) => {
    console.log('received password', password);
    replacepassword = password;
});

function getCookie(name) { //Cookie to keep track of failed login attempts
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    // return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

function setCookie(cname, cvalue, exsec) { //Set name,value and expiry of cookie
    var d = new Date();
    d.setTime(d.getTime() + exsec);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(document).ready(function () {

    var numLoads = parseInt(getCookie('pageLoads'), 10); //get cookie

    if (isNaN(numLoads) || numLoads <= 0) {
        setCookie('pageLoads', 1, 5000);
    } //set cookie with expiry 5 seconds
    else {
        setCookie('pageLoads', numLoads + 1);
    }

    console.log(getCookie('pageLoads'));

    if (numLoads == 3) { //If three failed login attempts
        if (document.getElementsByClassName('loginerrors mt-3')[0]) {
            alert("Incorrect Username/Password provided in AutoJoomer.Please change it.");
            window.stop();
        }
    }

    if (numLoads > 3) {
        setCookie('pageLoads', 0);
        numLoads = 0;
    } //Reset cookie to initial values if count>3

    var url = window.location.href;
    if (url == 'https://lms.iiitkottayam.ac.in/' || url == 'https://lmsone.iiitkottayam.ac.in/')
        document.getElementsByClassName('btn-login')[0].click();

    if (url == 'https://lms.iiitkottayam.ac.in/login/index.php' || url == 'https://lms.iiitkottayam.ac.in/login/index.php/#' || url == 'https://lmsone.iiitkottayam.ac.in/login/index.php' || url == 'https://lmsone.iiitkottayam.ac.in/login/index.php/#') {
        document.getElementById('username').value = replaceusername;
        document.getElementById('password').value = replacepassword;
        document.getElementsByClassName('btn btn-primary btn-block mt-3')[0].click();
    }

    if (url.includes('?reason=AutoJoomer')) {
        var btn = document.getElementById("join_button_input");

        var timerId = setInterval(function () {
            if (btn) {
                btn.click();
                clearInterval(timerId);
            } else {

                btn = document.getElementById("join_button_input");
            }
        }, 1000);
    }

    //to auto login on college Wi-Fi
    if (url.includes('http://172.16.222.1:1000/fgtauth')) {
        document.getElementById('ft_un').value = replaceusername;
        document.getElementById('ft_pd').value = replacepassword;
        document.getElementsByClassName('fer')[0].getElementsByTagName('input')[0].click();
    }
})