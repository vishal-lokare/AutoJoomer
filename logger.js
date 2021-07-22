var replaceusername, replacepassword;

chrome.runtime.sendMessage('getUsername', (username) => {
    console.log('received username', username);
    replaceusername = username;
});

chrome.runtime.sendMessage('getPassword', (password) => {
    console.log('received password', password);
    replacepassword = password;
});

$(document).ready(function () {
    console.log("inside");
    console.log(replaceusername);
    console.log(replacepassword);
    var url = window.location.href;
    if (url == 'https://lms.iiitkottayam.ac.in/')
        document.getElementsByClassName('btn-login')[0].click();

    if (url == 'https://lms.iiitkottayam.ac.in/login/index.php' || url == 'https://lms.iiitkottayam.ac.in/login/index.php/#') {
        document.getElementById('username').value = replaceusername;
        document.getElementById('password').value = replacepassword;
        document.getElementsByClassName('btn btn-primary btn-block mt-3')[0].click();
    }

    if (url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=1232' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=1233' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=1167' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=1165' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=1266')
        setTimeout(function () { document.getElementById("join_button_input").click(); }, 5000);
})