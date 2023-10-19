const bill = document.getElementById("bill");
const tipPercent = document.getElementById("tip-percent");
const custom = document.getElementById("custom");
const people = document.getElementById("people");
const tipAmountPer = document.getElementById("tip-amount");
const totalPer = document.getElementById("total-per");
const reset = document.getElementById("reset");
const tips = tipPercent.querySelectorAll("span");
const billDiv = document.getElementById("billDiv");
const peopleDiv = document.getElementById("peopleDiv");

// add event listeners to the bill, people, custom and reset
bill.addEventListener("input", handleBill);
people.addEventListener("input", handlePeople);
custom.addEventListener("input", handleCustom);
reset.addEventListener("click", handleReset);

// rounding the output to 2 decimal place
tipAmountPer.innerHTML = "$" + (0.0).toFixed(2);
totalPer.innerHTML = "$" + (0.0).toFixed(2);

let billValue = "0";
let peopleValue = "1";
let tipValue = "";
bill.value = "";
people.value = "1";

function handleBill() {
  billValue = parseFloat(bill.value);
  calculateTip();
}

function handlePeople() {
  peopleValue = parseFloat(people.value);

  if (peopleValue < 1) {
    peopleDiv.style.borderColor = "red";
    document.querySelector("small").innerHTML = "can't be blank";
  } else {
    peopleDiv.style.borderColor = "";
    peopleDiv.parentElement.querySelector("small").innerHTML = "";
  }
  calculateTip();
}

// to set the active on all tips percent
tipPercent.addEventListener("click", (e) => {
  tips.forEach((i) => {
    if (i.getAttribute("id") === e.target.getAttribute("id")) {
      i.classList.add("active");
      tipValue = parseFloat(i.innerHTML) / 100;
      custom.value = "";
      calculateTip();
    } else {
      i.classList.remove("active");
    }
  });
});

// to calculate the tip
function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = billValue / peopleValue + tipAmount;
    tipAmountPer.innerHTML = "$" + tipAmount.toFixed(2);
    totalPer.innerHTML = "$" + total.toFixed(2);
  }
}

function handleCustom() {
  tipValue = parseFloat(custom.value / 100);
  calculateTip();
}

function handleReset() {
  tipAmountPer.innerHTML = "$" + (0.0).toFixed(2);
  totalPer.innerHTML = "$" + (0.0).toFixed(2);
  bill.value = "";
  handleBill();
  people.value = "";
  handlePeople();
  tips.forEach((i) => {
    i.classList.remove("active");
  });
}
