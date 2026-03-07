const INTEGER_PATTERN = /^[1-9]\d*$/;
const FLOAT_PATTERN = /^\d+\.?\d*$/;

const calculatorForm = document.getElementById("calculator-form");
const billInput = document.getElementById("bill");
const numberOfPeopleInput = document.getElementById("number-of-people");
const tipPerPerson = document.getElementById("tip-per-person");
const totalPerPerson = document.getElementById("total-per-person ");

function calculateTipPerPerson(billAmount, tipAmount, numberOfPeople) {
  return (billAmount * tipAmount) / numberOfPeople;
}

function calculateTotalPerPerson(billAmount, numberOfPeople, tipPerPerson) {
  return billAmount / numberOfPeople + tipPerPerson;
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

  // for cursor position
  const { value, selectionStart, selectionEnd } = event.target;

  const nextValue =
    value.slice(0, selectionStart) + event.key + value.slice(selectionEnd);

  if (!pattern.test(nextValue)) {
    event.preventDefault();
  }
}

billInput.addEventListener("keydown", (event) =>
  handleNumberInput(event, FLOAT_PATTERN),
);

numberOfPeopleInput.addEventListener("keydown", (event) =>
  handleNumberInput(event, INTEGER_PATTERN),
);
