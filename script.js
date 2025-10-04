// Form Inputs
const billInput = document.getElementById("bill");
const tipPercentageBtns = document.querySelectorAll('input[name="tip"]');
const customTipInput = document.getElementById("tip-custom");
const peopleInput = document.getElementById("people");

// Results Outputs
const tipAmountOutput = document.getElementById("tip-amount");
const totalPerPersonOutput = document.getElementById("total-per-person");

// Reset Button
const resetButton = document.querySelector('button[type="reset"]');

function calculate() {
  const billAmount = billInput.valueAsNumber;
  const numberOfPeople = peopleInput.valueAsNumber;
  const checkedTipRadio = document.querySelector('input[name="tip"]:checked');
  const tipPercentage = checkedTipRadio ? Number(checkedTipRadio.value) : 0;

  // Calculate the tip amount for each person
  const tipAmountPerPerson =
    (billAmount * (tipPercentage / 100)) / numberOfPeople;

  // Calculate the total amount for each person
  const totalPerPerson = billAmount / numberOfPeople + tipAmountPerPerson;
}
