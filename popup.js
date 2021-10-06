window.onload = function () {
    document.getElementById("button").addEventListener("click", savevalues);
    document.getElementById("button").innerHTML = "SAVE";
    document.getElementById("button").disabled = false;

    ghManifestLink = 'https://www.vishal-lokare.co/AutoJoomer/manifest.json'
    $.getJSON(ghManifestLink, function(links) {
        var thisVersion = chrome.runtime.getManifest().version;
        if(links['version'] != thisVersion){
	    $.getJSON('https://www.vishal-lokare.co/AutoJoomer/version_updates.json', function(ver){
		var newUpdate = ver[thisVersion]
	    });
            if(window.confirm('New update : '+links['version']+' available.\nCurrent version : '+thisVersion+'\nPlease update from GH repo.\n\nNew in this update :\n'+newUpdate)){
                window.open('https://github.com/vishal-lokare/AutoJoomer', "_blank");
            }
        }
    });

}

function savevalues() {
    document.getElementById("button").style.color = "white";
    document.getElementById("button").innerHTML = "RESTART BROWSER";
    document.getElementById("button").disabled = true;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var branch = document.getElementById("branch").value;
    var confirmation;
    if (document.getElementById("confirmation").checked)
        confirmation = 1;
    else
        confirmation = 0;
    window.localStorage.setItem("AutoJoomerUsername", JSON.stringify(username));
    window.localStorage.setItem("AutoJoomerPassword", JSON.stringify(password));
    window.localStorage.setItem("AutoJoomerBranch", JSON.stringify(branch));
    window.localStorage.setItem("AutoJoomerConfirmation", JSON.stringify(confirmation));
}
