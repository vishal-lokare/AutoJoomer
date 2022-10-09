window.onload = function populate() {
  const year = document.querySelector("#year");
  const branch = document.querySelector("#branch");
  const batch = document.querySelector("#batch");
  //fetch AutoJoomerUsername, AutoJoomerYear, AutoJoomerBranch and AutoJoomerBatch
  chrome.storage.local.get("AutoJoomerUsername", function (result) {
    document.getElementById("roll").value = result["AutoJoomerUsername"];
  });
  document.getElementById("password").value = "******";
  chrome.storage.local.get("AutoJoomerYear", function (result) {
    year.value = result["AutoJoomerYear"];
  });
  chrome.storage.local.get("AutoJoomerBranch", function (result) {
    if (result["AutoJoomerBatch"] == "CSE") branch.value = "CSE";
    else if (result["AutoJoomerBatch"] == "CSY") branch.value = "CSY";
    else if (result["AutoJoomerBatch"] == "ECE") branch.value = "ECE";
    // branch.value = result["AutoJoomerBranch"];
  });
  chrome.storage.local.get("AutoJoomerBatch", function (result) {
    if(result["AutoJoomerBatch"] % 2) batch.value = 1;
    else batch.value = 2;
    // document.getElementById("batch").value = result["AutoJoomerBatch"];
  });
};
