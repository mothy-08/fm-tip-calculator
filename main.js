const INTEGER_PATTERN = /^[1-9]\d*$/;
const FLOAT_PATTERN = /^\d+\.?\d*$/;

const calculatorForm = document.getElementById("calculator-form");
const billInput = document.getElementById("bill");
const numberOfPeopleInput = document.getElementById("number-of-people");
const tipPerPersonEl = document.getElementById("tip-per-person");
const totalPerPersonEl = document.getElementById("total-per-person");
const customTipInput = document.getElementById("custom-tip");
const resetButton = document.getElementById("reset-button");

function calculateTipPerPerson(bill, tipRate, people) {
  return (bill * tipRate) / people;
}

function calculateTotalPerPerson(bill, people, tipPerPerson) {
  return bill / people + tipPerPerson;
}

function handleNumberInput(event, pattern) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
  ];
  if (allowedKeys.includes(event.key) || event.metaKey || event.ctrlKey) return;

  const { value, selectionStart, selectionEnd } = event.target;
  const nextValue =
    value.slice(0, selectionStart) + event.key + value.slice(selectionEnd);

  if (!pattern.test(nextValue)) {
    event.preventDefault();
  }
}

function getValues() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(numberOfPeopleInput.value);
  const selectedTip = document.querySelector('input[name="tip-rate"]:checked');

  const tipRate =
    selectedTip?.value === "custom"
      ? parseFloat(customTipInput.value) / 100
      : parseFloat(selectedTip?.value) / 100;

  return { bill, people, tipRate };
}

function updateOutput() {
  const { bill, people, tipRate } = getValues();

  if (!bill || !people || isNaN(tipRate)) return;

  const tipAmount = calculateTipPerPerson(bill, tipRate, people);
  const total = calculateTotalPerPerson(bill, people, tipAmount);

  tipPerPersonEl.textContent = `$${tipAmount.toFixed(2)}`;
  tipPerPersonEl.value = tipAmount;

  totalPerPersonEl.textContent = `$${total.toFixed(2)}`;
  totalPerPersonEl.value = total;
}

// input validation
billInput.addEventListener("keydown", (event) =>
  handleNumberInput(event, FLOAT_PATTERN),
);
numberOfPeopleInput.addEventListener("keydown", (event) =>
  handleNumberInput(event, INTEGER_PATTERN),
);
customTipInput.addEventListener("keydown", (event) =>
  handleNumberInput(event, FLOAT_PATTERN),
);

// dynamic output
billInput.addEventListener("input", updateOutput);
numberOfPeopleInput.addEventListener("input", updateOutput);
customTipInput.addEventListener("input", updateOutput);
document.querySelectorAll('input[name="tip-rate"]').forEach((radio) => {
  radio.addEventListener("change", updateOutput);
});

resetButton.addEventListener("click", () => {
  tipPerPersonEl.textContent = "$0.00";
  totalPerPersonEl.textContent = "$0.00";
  tipPerPersonEl.value = 0;
  totalPerPersonEl.value = 0;
  calculatorForm.reset();
});
