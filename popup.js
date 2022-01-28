//global variables
var username;
var password;
var branch;
var confirmation;
window.onload = function () {
    username = document.getElementById("username");
    password = document.getElementById("password");
    year = document.getElementById("year");
    branch = document.getElementById("branch");
    batch = document.getElementById("batch");
    confirmation = document.getElementById("confirmation");
    populator();
    document.getElementById("button").addEventListener("click", saveValues);
    document.getElementById("button").innerHTML = "SAVE";
    document.getElementById("button").disabled = false;

    ghManifestLink = 'https://www.vishal-lokare.co/AutoJoomer/manifest.json'
    $.getJSON(ghManifestLink, function (links) {
        var thisVersion = chrome.runtime.getManifest().version;
        if (links['version'] != thisVersion) {
            var newUpdate = 'none';
            $.getJSON('https://www.vishal-lokare.co/AutoJoomer/version_updates.json', function (ver) {
                newUpdate = ver[links['version']];
                if (window.confirm('New update : ' + links['version'] + ' available.\nCurrent version : ' + thisVersion + '\nPlease update from GH repo.\n\nNew in this update :\n' + newUpdate)) {
                    window.open('https://github.com/vishal-lokare/AutoJoomer', "_blank");
                }
            });
        }
    });

    document.getElementById("fpage").addEventListener("click", function () {
        chrome.tabs.create({
            url: chrome.runtime.getURL("full_page.html")
        });
    });

    document.getElementById("aboutus").addEventListener("click", function () {
        chrome.tabs.create({
            url: chrome.runtime.getURL("contributors.html")
        });
    });
}

function saveValues() {
    username = document.getElementById("username");
    password = document.getElementById("password");
    branch = document.getElementById("branch");
    confirmation = document.getElementById("confirmation");
    document.getElementById("button").style.color = "white";
    document.getElementById("button").innerHTML = "RESTART BROWSER";
    document.getElementById("button").disabled = true;
    var uname = username.value;
    var pass = password.value;
    var uyear = document.getElementById("year").value;
    var ubatch = document.getElementById("batch").value;

    var bran = branch.value;
    if (document.getElementById("confirmation").checked)
        conf = 1;
    else
        conf = 0;
    window.localStorage.setItem("AutoJoomerUsername", JSON.stringify(uname));
    window.localStorage.setItem("AutoJoomerPassword", JSON.stringify(pass));
    window.localStorage.setItem("AutoJoomerYear", JSON.stringify(uyear));
    window.localStorage.setItem("AutoJoomerBranch", JSON.stringify(bran));
    window.localStorage.setItem("AutoJoomerBatch", JSON.stringify(ubatch));
    window.localStorage.setItem("AutoJoomerConfirmation", JSON.stringify(conf));
}

function populator() {
    username = document.getElementById("username");
    password = document.getElementById("password");
    year = document.getElementById("year");
    branch = document.getElementById("branch");
    batch = document.getElementById("batch");
    confirmation = document.getElementById("confirmation");
    //setting the values
    if (JSON.parse(window.localStorage.getItem("AutoJoomerUsername")) != null)
        username.value = JSON.parse(window.localStorage.getItem("AutoJoomerUsername"));
    if (JSON.parse(window.localStorage.getItem("AutoJoomerPassword")) != null)
        password.value = JSON.parse(window.localStorage.getItem("AutoJoomerPassword"));
    if (JSON.parse(window.localStorage.getItem("AutoJoomerYear")) != null)
        year.value = JSON.parse(window.localStorage.getItem("AutoJoomerYear"));
    if (JSON.parse(window.localStorage.getItem("AutoJoomerBranch")) != null)
        branch.value = JSON.parse(window.localStorage.getItem("AutoJoomerBranch"));
    if (JSON.parse(window.localStorage.getItem("AutoJoomerBatch")) != null)
        batch.value = JSON.parse(window.localStorage.getItem("AutoJoomerBatch"));

    if (JSON.parse(window.localStorage.getItem("AutoJoomerConfirmation")) == 1)
        confirmation.checked = true;
    if (JSON.parse(window.localStorage.getItem("AutoJoomerConfirmation")) == 0)
        confirmation.checked = false;
}