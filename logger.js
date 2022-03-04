var replaceusername, replacepassword;

chrome.runtime.sendMessage('getUsername', (username) => {
    console.log('received username', username);
    replaceusername = username;
});

chrome.runtime.sendMessage('getPassword', (password) => {
    console.log('received password', password);
    replacepassword = password;
});

function getCookie(name) { //changes
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}
function setCookie(cname, cvalue, exsec) {
    var d = new Date();
    d.setTime(d.getTime() + exsec);
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


$(document).ready(function () {
    //changes
    var numLoads = parseInt(getCookie('pageLoads'), 10);

    if (isNaN(numLoads) || numLoads <= 0) { setCookie('pageLoads', 1,5000); }
    else { setCookie('pageLoads', numLoads + 1); }

    console.log(getCookie('pageLoads'));

    if(numLoads==3){
        if(document.getElementsByClassName('loginerrors mt-3')[0])
        {
        
            //window.location = "https://www.google.co.in/";
            alert("Incorrect Username/Password provided in AutoJoomer.Please change it.");
            window.stop();
            
            
        }
    }
    //changes
    if(numLoads>3){setCookie('pageLoads', 0);numLoads=0; }
       
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
})