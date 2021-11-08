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

    if (url.includes('?reason=AutoJoomer')){
        var ctr=0;
            function getAllInWindow(){
                chrome.tabs.query({}, function(tabs) {
                    for (let i = 0, tab; tab = tabs[i]; i++) {
                        if (tab.url.includes('https://ocs.iiitkottayam.ac.in/html5client/')){
                            window.open('','_parent',''); 
                            window.close();
                            // chrome.tabs.update(tab.id, {active: true});
                            ctr+=1;
                            return;
                        }
                    }
            });
        }
        if (!ctr){
            var btn = document.getElementById("join_button_input");
        
            var timerId = setInterval(function(){ 
               if(btn){
                     btn.click();
                     clearInterval(timerId);
               }
               else{
                     btn = document.getElementById("join_button_input");
               }
        }, 1000);
        }
    }
})