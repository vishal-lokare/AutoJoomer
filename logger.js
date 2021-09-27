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
    
    if (url.includes('https://lms.iiitkottayam.ac.in/mod/bigbluebuttonbn/view.php?id='))
        var btn = document.getElementById("join_button_input");
        
        var timerId = setInterval(function(){ 
               if(btn){
                     btn.click();
                     console.log("Button exists, joining class");
                     clearInterval(timerId);
               }
               else{
                     btn = document.getElementById("join_button_input");
               }
        }, 1000);
})
