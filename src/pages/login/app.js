const roll = document.querySelector("#roll");
const year = document.querySelector("#year");
const branch = document.querySelector("#branch");
const batch = document.querySelector("#batch");
const password = document.querySelector("#password");
const btn = document.getElementById("mb");
let pattern = /20(20BCS)((000[1-9])|(00[1-9][0-9])|(01[0-8][0-9])|(0190))|(21BCS)((000[1-9])|(00[1-9][0-9])|(01[0-9][0-9]))|(21BCY)((000[1-9])|(00[1-3][0-9])|(004[0-6]))|(20BEC)((000[1-9])|(00[1-3][0-9]))|(21BEC)((000[1-9])|(00[1-3][0-9])|(004[0-4])))/gim;
const elements = document.getElementsByTagName('input');
let firstChange = 0;

//disabling them
year.disabled = true;
branch.disabled = true;
batch.disabled = true;
let logo = document.getElementById("nav_logo");

logo.addEventListener("click", open_autojoomer);

function open_autojoomer() {
  window.open("https://www.autojoomer.co/", (target = "_blank"));
}

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("keyup", () => {
    firstChange++;
    if (!firstChange) {
      roll.value = "";
      password.value = "";
      year.value = "";
      branch.value = "";
      batch.value = "";
    }
  });
}

//year
var yearValue = "";
roll.addEventListener("keyup", () => {
  let inputValue = roll.value.toUpperCase();
  yearValue = inputValue.slice(0, 4);
  if (yearValue == 2019) {
    year.value = "2019";
    branch.value = "CSE";
    batch.value = "";
  }
  else if (yearValue == 2020) {
    year.value = "2020";
  }
  else if (yearValue == 2021) {
    year.value = "2021";
  }
});

// branch
var branchValue = "";
roll.addEventListener("keyup", () => {
  let inputValue = roll.value.toUpperCase();
  branchValue = inputValue.slice(4, 7);
  if (branchValue == "BCS") {
    branch.value = "CSE";
  }
  else if (branchValue == "BEC") {
    if (year.value != "2019") {
      branch.value = "ECE";
    }
  }
  else if (branchValue == "BCY") {
    if (year.value != "2019" && year.value != "2020") {
      branch.value = "CSY";
    }
  }
});

//batch
var batchValue = "";
var setvalue = "";
roll.addEventListener("keyup", () => {
  let inputValue = roll.value.toUpperCase();
  if (inputValue.length > 10) {
    batchValue = inputValue[10];
    if (year.value != "2019") {
      if (batchValue % 2 == 0) {
        batch.value = "2";
      }
      else {
        batch.value = "1";
      }
    }
    else batch.value = "";
  }
});

btn.addEventListener("click", () => {
  if (roll.value == "" || password.value == "") {
    alert("Please fill values");
    return;
  }
  if (roll.value.length != 11) {
    alert("Invalid Roll Number");
    return;
  }
  let t = pattern.test(roll.value);
  if (t) {
    alert("You have been Logged In");
    chrome.storage.local.set({ ["AutoJoomerUsername"]: roll.value });
    chrome.storage.local.set({ ["AutoJoomerPassword"]: password.value });
    chrome.storage.local.set({ ["AutoJoomerYear"]: yearValue });
    chrome.storage.local.set({ ["AutoJoomerBranch"]: branchValue });
    chrome.storage.local.set({ ["AutoJoomerBatch"]: batchValue });
    chrome.storage.local.set({ ["AutoJoomerBatch"]: setvalue });
    btn.setAttribute(
      "style",
      "background: var(--light);  color: rgba(9, 9, 120, 1);"
    );
    btn.disabled = true;
    btn.innerText = "Saved";

    //Create button to go back
    const div = document.getElementsByClassName("form-container")[0];
    const back_button = document.createElement('BUTTON');
    back_button.className = "submit-btn";
    back_button.id = "back";
    const text = document.createTextNode("Home");
    back_button.onclick = function () { //Redirect to popup
      window.open("/src/js/popup.html", "_self");
    }
    back_button.appendChild(text);
    //append line break
    div.appendChild(document.createElement("br"));
    div.appendChild(back_button);

  } else {
    alert("The Roll number does not exist");
    return;
  }
});
