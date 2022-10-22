const roll = document.querySelector("#roll");
const year = document.querySelector("#year");
const branch = document.querySelector("#branch");
const batch = document.querySelector("#batch");
const password = document.querySelector("#password");
const btn = document.getElementById("mb");
const backBtn = document.getElementById("backmb");
let pattern = /20(19BCS((000[1-9])|(00[1-9][0-9])|(01[01][0-9])|(012[0-2]))|(20BCS)((000[1-9])|(00[1-9][0-9])|(01[0-8][0-9])|(0190))|(21BCS)((000[1-9])|(00[1-9][0-9])|(01[0-9][0-9]))|(21BCY)((000[1-9])|(00[1-3][0-9])|(004[0-6]))|(20BEC)((000[1-9])|(00[1-3][0-9]))|(21BEC)((000[1-9])|(00[1-3][0-9])|(004[0-4])))/gim;
const elements = document.getElementsByTagName('input');
let firstChange = 0;

//disabling them
year.disabled = true;
branch.disabled = true;
batch.disabled = true;

for(let i = 0; i < elements.length; i++) {
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
  } else if (yearValue == 2020) {
    year.value = "2020";
  } else if (yearValue == 2021) {
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
  } else if (branchValue == "BEC") {
    if (year.value != "2019") {
      branch.value = "ECE";
    }
  } else if (branchValue == "BCY") {
    if (year.value != "2019" && year.value != "2020") {
      branch.value = "CSY";
    }
  }
});

//batch
var batchValue = "";
roll.addEventListener("keyup", () => {
  let inputValue = roll.value.toUpperCase();
  if (inputValue.length > 10) {
    batchValue = inputValue[10];
    if (year.value != "2019") {
      if (batchValue % 2 == 0) {
        batch.value = "2";
      } else {
        batch.value = "1";
      }
    } else batch.value = "";
  }
});

backBtn.addEventListener("click", () => {
  window.open("../../popup.html", "_self");
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
  if (pattern.test(roll.value)) {
    chrome.storage.local.set({ ["AutoJoomerUsername"]: roll.value });
    password.value !== "******" && chrome.storage.local.set({ ["AutoJoomerPassword"]: password.value });
    chrome.storage.local.set({ ["AutoJoomerYear"]: yearValue });
    chrome.storage.local.set({ ["AutoJoomerBranch"]: branchValue });
    chrome.storage.local.set({ ["AutoJoomerBatch"]: batchValue });
    btn.setAttribute(
      "style",
      "background: var(--light);  color: rgba(9, 9, 121, 1);"
    );
    btn.disabled = true;
    btn.innerText = "Saved";
    setTimeout(() => { //redirecting to popup.html
      window.open("../../popup.html", "_self");
    }, 1000);

  } else {
    alert("Roll number does not exist");
    return;
  }
});


let checker = 0;
theme();
function theme() {
  console.log("login - theme");

  const mode = window.localStorage.getItem("dark_check");

  if (mode === null || mode == 0);
  else {
    console.log("Changing mode ...", mode);
    mode_change();
  }
}

function mode_change() {
  let element1 = document.getElementsByClassName("form-container")[0];
  element1.classList.toggle("dark_bg");

  if (checker) {
    window.localStorage.setItem("dark_check", 0);
    checker = 0;
  } else {
    window.localStorage.setItem("dark_check", 1);
    checker = 1;
  }

  let element2 = document.getElementsByTagName("input");
  if (checker === 1) {
    for (let i = 0 ; i < element2.length; i++) {
      element2[i].style.backgroundColor = "#e6e7f2"
    }
  }

  let element3 = document.getElementsByTagName("select");
  if (checker === 1) {
    for (let i = 0 ; i < element3.length; i++) {
      element3[i].style.backgroundColor = "#c1c3d4"
    }
  } else {
    for (let i = 0 ; i < element3.length; i++) {
      element3[i].style.backgroundColor = "null"
    }
  }
  
}
