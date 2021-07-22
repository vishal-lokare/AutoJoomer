window.onload = function () {
    document.getElementById("button").addEventListener("click", savevalues);
    document.getElementById("button").innerHTML = "SAVE";
    document.getElementById("button").disabled = false;
}

function savevalues() {
    document.getElementById("button").style.color = "black";
    document.getElementById("button").innerHTML = "RESTART BROWSER";
    document.getElementById("button").disabled = true;
    var branch = document.getElementById("branch").value;
    var batch = document.getElementById("batch").value;
    window.localStorage.setItem("AutoJoomerBranch", JSON.stringify(branch));
    window.localStorage.setItem("AutoJoomerBatch", JSON.stringify(batch));
}