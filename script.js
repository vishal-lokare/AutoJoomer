var username = JSON.parse(window.localStorage.getItem("AutoJoomerUsername"));
var password = JSON.parse(window.localStorage.getItem("AutoJoomerPassword"));
var branch = JSON.parse(window.localStorage.getItem("AutoJoomerBranch"));
var batch = JSON.parse(window.localStorage.getItem("AutoJoomerBatch"));

console.log(username + " " + password);
if ((branch == null) || (batch == null) || (branch == "null") || (batch == "null") || (username == null) || (password == null) || (username == "null") || (password == "null") || (username == "") || (password == "")) {
    alert("Some values have not been set. Navigate to the extensions panel in your browser, choose \"AutoJoomer\",  save your values and restart your browser for changes to take effect.");
}
else {
    runningscript();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'getUsername') {
        sendResponse(username);
    }
    if (message === 'getPassword') {
        sendResponse(password);
    }
});

function runningscript() {
    console.log("Username = " + username);
    console.log("Password = " + password);
    console.log("Branch = " + branch);
    console.log("Batch = " + batch);
    var now = new Date();
    var h = [0, 8, 9, 10, 12, 14, 16];
    var m = [0, 30, 40, 50, 0, 0, 45];
    var thatClassLink = ['', '', '', '', '', '', '', '']
    var thatClassName = ['', '', '', '', '', '', '', '']
    var millisOfThatClass = [0, 0, 0, 0, 0, 0, 0, 0]

    $.getJSON('https://autojoomer-45dc2-default-rtdb.asia-southeast1.firebasedatabase.app/links.json', function (links) {
        console.log("Started AutoJoomer");
        var day = now.getDay();
        var thatDay = (links[day])
        console.log(thatDay)
        for (let i = 1; i < 7; i++) {
            var thatClass = thatDay[i];
            if (i != 5) {
                if (branch == 'E') {
                    thatClassName[i] = thatClass['class_name2'];
                    thatClassLink[i] = thatClass['class_link2'];
                }
                else {
                    thatClassName[i] = thatClass['class_name'];
                    thatClassLink[i] = thatClass['class_link'];
                }
            }
            else {
                if (batch == thatClass['class_name'][0]) {
                    thatClassName[i] = thatClass['class_name'];
                    thatClassLink[i] = thatClass['class_link'];
                }
                else if (batch == thatClass['class_name2'][0]) {
                    thatClassName[i] = thatClass['class_name2'];
                    thatClassLink[i] = thatClass['class_link2'];
                }
            }
            if (branch == 'E' && (thatClassName[i] == "1_ICS123_LAB" || thatClassName[i] == "2_ICS123_LAB")) {
                thatClassName[i] = '';
            }
            if (thatClassName[i] == '') continue;
            millisOfThatClass[i] = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h[i], m[i], 0, 0) - now;
            if (millisOfThatClass[i] > 0) {
                setTimeout(function () {
                    if (window.confirm('Now the class is ' + thatClassName[i] + ' at ' + h[i] + ":" + m[i])) {
                        window.open(thatClassLink[i], "_blank");
                    }
                }, millisOfThatClass[i]);
            }
            else if (millisOfThatClass[i] > -3600000) {
                if (window.confirm('Now the class is ' + thatClassName[i] + ' at ' + h[i] + ":" + m[i])) {
                    window.open(thatClassLink[i], "_blank");
                }
            }
        }
    });
}
