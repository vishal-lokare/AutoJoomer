window.onload = function populate() {
  const year = document.querySelector("#year");
  const branch = document.querySelector("#branch");
  const batch = document.querySelector("#batch");
  
  //fetch AutoJoomerUsername, AutoJoomerYear, AutoJoomerBranch and AutoJoomerBatch
  chrome.storage.local.get("AutoJoomerUsername", function (result) {
    document.getElementById("roll").value = result["AutoJoomerUsername"];
  });

  document.getElementById("password").value = "*******";
  
  chrome.storage.local.get("AutoJoomerYear", function (result) {
    document.getElementById("year").value = result["AutoJoomerYear"];
  });

  chrome.storage.local.get("AutoJoomerBranch", function (result) {
    if (result["AutoJoomerBranch"] == "BCS"){
      document.getElementById("branch").value = "CSE";
    }
    else if (result["AutoJoomerBranch"] == "BCY"){
      document.getElementById("branch").value = "CSY";
    }
    if (result["AutoJoomerBranch"] == "BEC"){
      document.getElementById("branch").value = "ECE";
    }
  });

  chrome.storage.local.get("AutoJoomerBatch", function (result) {
    if (result["AutoJoomerBatch"] == ""){
      document.getElementById("batch").value = "";
    }
    else if (result["AutoJoomerBatch"] % 2 == 1){
      document.getElementById("batch").value = "1";
    }
    else if (result["AutoJoomerBatch"] % 2 == 0){
      document.getElementById("batch").value = "2";
    }
    
  });

};