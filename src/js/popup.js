let checker = 0;
let study_year = "";
window.onload = function () {
  theme(); //checks theme
  // pingURL();
  //isOnline();
};

window.onload = function populate() {
  const year = document.querySelector("#year");
  //fetch AutoJoomerYear

  chrome.storage.local.get("AutoJoomerYear", function (result) {
    study_year = result["AutoJoomerYear"];
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("nav_button").addEventListener("click", mode_change);
  document.getElementById("nav_logo").addEventListener("click", open_autojoomer);
  document.getElementById("lms_button").addEventListener("click", open_lms);
});

function open_autojoomer() {
  window.open("https://www.autojoomer.co/", (target = "_blank"));
}

function open_lms() {
  //study_year = document.login_form.year.selectedIndex;    
  if (study_year == 2020) { window.open("https://lms.iiitkottayam.ac.in/", (target = "_blank")); }
  else if (study_year == 2019 || study_year == 2021) { window.open("https://lmsone.iiitkottayam.ac.in/", (target = "_blank")); }
  else { alert("KINDLY ENTER YOUR CREDENTIALS"); }
}

function mode_change() {
  let element1 = document.body;
  element1.classList.toggle("dark_bg");

  if (checker) {
    window.localStorage.setItem("dark_check", 0);
    checker = 0;
  } else {
    window.localStorage.setItem("dark_check", 1);
    checker = 1;
  }

  let element2 = document.getElementById("reminders");
  console.log(element2);

  if (checker === 1) {
    element2.classList.remove("sections");
    element2.classList.add("dark_content");
  } else {
    element2.classList.remove("dark_content");
    element2.classList.add("sections");
  }

  let element3 = document.getElementsByClassName("foot_box");
  for (let i = 0; i < element3.length; i++) {
    if (element3[i].classList.contains("foot_item")) {
      element3[i].classList.remove("foot_item");
      element3[i].classList.add("dark_foot");
      console.log("going to dark");
    } else {
      element3[i].classList.remove("dark_foot");
      element3[i].classList.add("foot_item");
      console.log("dark to light");
    }
  }
}

function theme() {
  console.log("theme");

  const mode = window.localStorage.getItem("dark_check");
  // console.log("mode", mode)
  if (mode === null || mode == 0);
  else {
    console.log("Changing mode ...", mode);
    mode_change();
  }
}

// connect to wifi button

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("dis_conn").addEventListener("click", connect_wifi);
});

async function connect_wifi() {
  console.log("clicked");
  let id = null;
  clearInterval(id);
  const elem = document.getElementById("svg_wifi").querySelectorAll("path");
  id = setInterval(tower, 5);
  async function tower() {
    for (let i = 0; i < elem.length; i++) {
      elem[i].style.fill = "#4990F5";
      await new Promise((done) => setTimeout(() => done(), 200));
    }
  }
  await new Promise((done) => setTimeout(() => done(), 1000));
  window.open("http://www.msftconnecttest.com/redirect"), "_blank";
  // let offline=document.getElementById("dis_conn")
  // let online=document.getElementById("wifi_conn")
  // offline.style.display="none";
  // online.style.display="flex";
}

