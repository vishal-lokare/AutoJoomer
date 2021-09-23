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
    var url = window.location.href;
    if (url == 'https://lms.iiitkottayam.ac.in/')
        document.getElementsByClassName('btn-login')[0].click();

    if (url == 'https://lms.iiitkottayam.ac.in/login/index.php' || url == 'https://lms.iiitkottayam.ac.in/login/index.php/#') {
        document.getElementById('username').value = replaceusername;
        document.getElementById('password').value = replacepassword;
        document.getElementsByClassName('btn btn-primary btn-block mt-3')[0].click();
    }

    if (url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2266' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2270' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2269' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2268' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2267' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2277' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2276' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2275' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2274' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2273' || url == 'https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id=2272')
        setTimeout(function () { document.getElementById("join_button_input").click(); }, 5000);
})
