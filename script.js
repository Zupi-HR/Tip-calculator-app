const form = document.getElementById("tip-form");
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

function getFormValues() {
  const billAmount = billInput.valueAsNumber || 0;
  const numberOfPeople = peopleInput.valueAsNumber || 0;
  const customTipPercentage = customTipInput.valueAsNumber;
  const checkedTipRadio = document.querySelector('input[name="tip"]:checked');

  const tipPercentage = !isNaN(customTipPercentage)
    ? customTipPercentage
    : checkedTipRadio
    ? Number(checkedTipRadio.value)
    : 0;

  return { billAmount, tipPercentage, numberOfPeople };
}

function calculate(billAmount, tipPercentage, numberOfPeople) {
  // Calculate the tip amount for each person
  const tipAmountPerPerson =
    (billAmount * (tipPercentage / 100)) / numberOfPeople;

  // Calculate the total amount for each person
  const totalPerPerson = billAmount / numberOfPeople + tipAmountPerPerson;

  return { tipAmountPerPerson, totalPerPerson };
}

function calculateAndDisplayResults() {
  const { billAmount, tipPercentage, numberOfPeople } = getFormValues();

  // Decide if the "Reset" button should be active
  if (billAmount > 0 || numberOfPeople > 0 || tipPercentage > 0) {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }

  if (billAmount > 0 && numberOfPeople > 0 && tipPercentage >= 0) {
    const { tipAmountPerPerson, totalPerPerson } = calculate(
      billAmount,
      tipPercentage,
      numberOfPeople
    );
    tipAmountOutput.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    totalPerPersonOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipAmountOutput.textContent = "$0.00";
    totalPerPersonOutput.textContent = "$0.00";
  }
}

form.addEventListener("input", (event) => {
  if (event.target.name === "tip") {
    customTipInput.value = "";
  }

  if (event.target.name === "tip-custom") {
    const checkedTipRadio = document.querySelector('input[name="tip"]:checked');
    if (checkedTipRadio) checkedTipRadio.checked = false;
  }
  calculateAndDisplayResults();
});

form.addEventListener("reset", () => {
  tipAmountOutput.textContent = "$0.00";
  totalPerPersonOutput.textContent = "$0.00";
  resetButton.disabled = true;
});
