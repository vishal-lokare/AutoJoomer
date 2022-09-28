window.onload = function populate() {
  chrome.storage.local.get("AutoJoomerUsername", function (result) {
    document.getElementById("roll").value = result["AutoJoomerUsername"];
  });
  document.getElementById("password").value = "******";
};