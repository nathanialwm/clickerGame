
//declare constants
const storage = window.localStorage;
const counter = document.getElementById("count");
const clicker = document.getElementById("clicker");
const savebtn = document.getElementById("savebtn");
const clearbtn = document.getElementById("clearbtn");
const auto = document.getElementById("auto");
const up1 = document.getElementById("up1");
const up2 = document.getElementById("up2");
const income = document.getElementById("income");

//responsive line height
var height = document.getElementById("savebtn").clientHeight;

document.getElementById("savebtn").style.lineHeight = height + "px";
document.getElementById("clearbtn").style.lineHeight = height + "px";
document.getElementById("auto").style.lineHeight = height + "px";

//responsive circle
var width = clicker.clientWidth;
clicker.style.height = width + "px";
clicker.style.lineHeight = width + "px";


let save = {};
var clickStrength;
var passive;
var up1done;
var up2done;
var autoOn;

//check save
if (storage.getItem("save")) {
  save = JSON.parse(storage.getItem("save"));
  counter.innerHTML = "Gold: " + save.count;
  clickStrength = JSON.parse(storage.getItem("clickStrength"));
  passive = JSON.parse(storage.getItem("passive"));
  up1done = JSON.parse(storage.getItem("up1done"));
  up2done = JSON.parse(storage.getItem("up2done"));
  autoOn = JSON.parse(storage.getItem("autoOn"));
  income.innerHTML = "Income: " + passive;
  //check upgrades
  if (JSON.parse(storage.getItem("up1done")) === 0) {
    up1.style.visibility = "visible";
  } else {
    up1.style.visibility = "hidden";
  };

  if (JSON.parse(storage.getItem("up2done")) === 0) {
    up2.style.visibility = "visible";
  } else {
    up2.style.visibility = "hidden";
  };

  //check autosave
  if (autoOn === 0) {
    //turn on autosave
    auto.innerHTML = "Autosave Disabled";
  } else {
    //turn off autosave
    auto.innerHTML = "Autosave Enabled";
  }

} else {
  save.count = 0;
  counter.innerHTML = "Gold: " + 0;
  income.innerHTML = "Income: " + 0;
  clickStrength = 1;
  passive = 0;
  up1done = 0;
  up2done = 0;
  autoOn = 0;
  auto.innerHTML = "Autosave Disabled";
};

//clicker

clicker.addEventListener("click", function() {
  save.count = save.count + clickStrength;
  counter.innerHTML = "Gold: " + save.count;
});

//passive Income
setInterval(function pIncome() {
  save.count = save.count + passive;
  counter.innerHTML = "Gold: " + save.count;
}, 1000);

//save
savebtn.addEventListener("click", function() {
  storage.setItem("save", JSON.stringify(save));
  storage.setItem("clickStrength", JSON.stringify(clickStrength));
  storage.setItem("passive", JSON.stringify(passive));
  storage.setItem("up1done", JSON.stringify(up1done));
  storage.setItem("up2done", JSON.stringify(up2done));
  storage.setItem("autoOn", JSON.stringify(autoOn));
});

//autosave button
auto.addEventListener("click", function() {
  if (autoOn === 0) {
    //turn on autosave
    autoOn = 1;
    auto.innerHTML = "Autosave Enabled";
  } else {
    //turn off autosave
    autoOn = 0;
    auto.innerHTML = "Autosave Disabled";
  };
});

//autosave
setInterval(function() {
  if (autoOn === 0) {
    //do nothing
  } else {
    function autosave() {
      setInterval(function () {
        storage.setItem("save", JSON.stringify(save));
        storage.setItem("clickStrength", JSON.stringify(clickStrength));
        storage.setItem("passive", JSON.stringify(passive));
        storage.setItem("up1done", JSON.stringify(up1done));
        storage.setItem("up2done", JSON.stringify(up2done));
        storage.setItem("autoOn", JSON.stringify(autoOn));
      }, 3000);
    };
    autosave();
  };
}, 100);

//clear
clearbtn.addEventListener("click", function () {
  storage.clear();
});

//Upgrades
up1.addEventListener("click", function() {
  if (save.count >= 10) {
    save.count = save.count - 10;
    clickStrength = clickStrength + 1;
    up1.style.visibility = "hidden";
    up1done = up1done + 1;
    counter.innerHTML = "Gold: " + save.count;
  } else {
    //nothing happens
  };
});

up2.addEventListener("click", function() {
  if (save.count >= 50) {
    save.count = save.count - 50;
    passive = passive + 0.5;
    up2.style.visibility = "hidden";
    up2done = up2done + 1;
    income.innerHTML = "Income: " + passive;
    counter.innerHTML = "Gold: " + save.count;
  }
});
