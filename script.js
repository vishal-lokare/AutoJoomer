var username = JSON.parse(window.localStorage.getItem("AutoJoomerUsername"));
var password = JSON.parse(window.localStorage.getItem("AutoJoomerPassword"));
var year = JSON.parse(window.localStorage.getItem("AutoJoomerYear"));
var branch = JSON.parse(window.localStorage.getItem("AutoJoomerBranch"));
var batch = JSON.parse(window.localStorage.getItem("AutoJoomerBatch"));
var earlyjoin = JSON.parse(window.localStorage.getItem("AutoJoomerearlyjoin"));
var confirmation = JSON.parse(window.localStorage.getItem("AutoJoomerConfirmation"));

if (year == "" || branch == "" || batch == "" || username == "" || password == "" || confirmation == null) {
	if (year == "2019")
		runningscript();
	else
		alert("Some values have not been set. Navigate to the extensions panel in your browser, choose \"AutoJoomer\",  save your values and restart your browser for changes to take effect.");
} else {
	runningscript();
}

ghManifestLink = 'https://www.vishal-lokare.co/AutoJoomer/manifest.json'
$.getJSON(ghManifestLink, function (links) {
	var thisVersion = chrome.runtime.getManifest().version;
	if (links['version'] != thisVersion) {
		var newUpdate = 'none';
		$.getJSON('https://www.vishal-lokare.co/AutoJoomer/version_updates.json', function (ver) {
			newUpdate = ver[links['version']]
			if (window.confirm('New update : ' + links['version'] + ' available.\nCurrent version : ' + thisVersion + '\nPlease update from GH repo.\n\nNew in this update : \n' + newUpdate)) {
				window.open('https://github.com/vishal-lokare/AutoJoomer', "_blank");
			}
		});
	}
});

chrome.runtime.onInstalled.addListener(function (details) {
	var thisVersion = chrome.runtime.getManifest().version;
	if (details.reason == "install") {
		window.alert("Welcome to AutoJoomer!!\nVersion - " + thisVersion);
		window.localStorage.setItem("AutoJoomerVersion", thisVersion)
	} else if (details.reason == "update") {
		if (details.previousVersion != thisVersion)
			$.getJSON('https://www.vishal-lokare.co/AutoJoomer/version_updates.json', function (ver) {
				var newUpdate = ver[thisVersion];
				window.alert("AutoJoomer updated from " + details.previousVersion + " to " + thisVersion + "!\n\nNew in this version - \n" + newUpdate);
				window.localStorage.setItem("AutoJoomerVersion", thisVersion)
			});
	}
});

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
	console.log("Confirmation Required = " + confirmation);

	var now = new Date();
	var timeouts = [];
	var h = [];
	var m = [];
	var thatClassLink = [];
	var thatClassName = [];
	var millisOfThatClass = [];
	var eho;
	var emi;
	earlyjoin =  parseInt(earlyjoin);
	var day = now.getDay();
	if (branch == "C")
		br = "CSE";
	else
		br = "ECE";
	var dbReference = year + br + batch;
	// console.log(dbReference);

	const firebaseConfig = {
		apiKey: "AIzaSyDbgLGtFvaeR_4n_9UPuvkhcXjsLc0-ERk",
		authDomain: "autojoomer-45dc2.firebaseapp.com",
		databaseURL: "https://autojoomer-45dc2-default-rtdb.asia-southeast1.firebasedatabase.app",
		projectId: "autojoomer-45dc2",
		storageBucket: "autojoomer-45dc2.appspot.com",
		messagingSenderId: "242655078934",
		appId: "1:242655078934:web:9f086736bb92fb6c7ba337",
		measurementId: "G-JMRV971YRF"
	};

	firebase.initializeApp(firebaseConfig);
	var db = firebase.database().ref().child('links').child(dbReference).child(day);
	db.on('value', function (links) {
		console.log("AutoJoomer started");
		if (links.val() == null || links.val().length == 1) {
			window.alert("No classes found for today.");
			return;
		}
		for (let i = 0; i < timeouts.length; i++)
			clearTimeout(timeouts[i]);
		var thatDay = links.toJSON();
		if (thatDay != null) {
			//counts the number of lectures on that day
			var nooflec = Object.keys(thatDay).length;
			for (let i = 1, j = 0; i < nooflec; i++, j++) {
				let now = new Date();

				//Convert Timezone to IST
	
				let utcOffset = now.getTimezoneOffset() * 60000;
				let localTime = now.getTime();
				let utc = localTime + utcOffset;
				let istOffset = 5.5;  
				let ist = utc + (3600000*istOffset);
				now = new Date(ist);
				
				var thatClass = thatDay[i];

				thatClassName[i] = thatClass['class_name'];
				thatClassLink[i] = thatClass['class_link'];
				//to check if the class name, link, time is/are empty
				if (thatClassName[i] == '' || thatClassLink[i] == '' || thatClass['class_time'] == '') continue;
				if (!thatClassName[i] || !thatClassLink[i] || !thatClass['class_time']) continue;

				//parseint to convert string to integer
				h[i] = thatClass['class_time'].substring(0, 2);
				m[i] = thatClass['class_time'].substring(2, 4);
				eho = thatClass['class_time'].substring(0, 2);
				emi =  thatClass['class_time'].substring(2, 4);
				//early join code
				if(m[i]-earlyjoin>=0){
					emi = m[i]-earlyjoin;
					
				}
				else{
					emi = m[i]-earlyjoin+60;
					eho = h[i]-1;
				}
				console.log(thatClassName[i] + " " + thatClassLink[i].substring(thatClassLink[i].length - 22, thatClassLink[i].length - 18) + " " + h[i] + " " + m[i]);
				millisOfThatClass[i] = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(eho), parseInt(emi), 0, 0) - now;
				
				if (millisOfThatClass[i] > 0) {
					timeouts[j] = setTimeout(function () {
						if (confirmation == 1) {
							if (window.confirm('Now the class is ' + thatClassName[i] + ' at ' + h[i] + ":" + m[i]))
								window.open(thatClassLink[i], "_blank");
						} else
							window.open(thatClassLink[i], "_blank");
					}, millisOfThatClass[i]);
				} else if (millisOfThatClass[i] > -3600000) {
					if (confirmation == 1) {
						if (window.confirm('Now the class is ' + thatClassName[i] + ' at ' + h[i] + ":" + m[i]))
							window.open(thatClassLink[i], "_blank");
					} else
						window.open(thatClassLink[i], "_blank");
				}
			}
		}
	});
}
