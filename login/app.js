const roll = document.querySelector("#roll");
const year = document.querySelector("#year");
const branch = document.querySelector("#branch");
const batch = document.querySelector("#batch");
const password = document.querySelector("#password");
const btn = document.getElementById("mb");
let pattern = /20[1-2][0-9]B[CE][ES]0[0-2][0-9][0-9]/gi;

//disabling them
year.disabled = true;
branch.disabled = true;
batch.disabled = true;

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
    if (year.value != "2019" || year.value != "2020") {
      branch.value = "BCY";
    }
  }
});

//batch
var batchValue = "";
roll.addEventListener("keyup", () => {
  let inputValue = roll.value.toUpperCase();
  batchValue = inputValue.slice(10);
  if (year.value != "2019") {
    if (inputValue.length > 7) {
      if (batchValue % 2 == 0) {
        batch.value = "batch2";
      } else {
        batch.value = "batch1";
      }
    }
  }
});

btn.addEventListener("click", () => {
  if (!pattern.test(roll.value)) {
    alert("Invalid Roll Number");
  }
});
