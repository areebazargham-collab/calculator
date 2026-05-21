let display = document.getElementById("display");

let firstValue = "";
let secondValue = "";
let operator = null;

// Add numbers / decimal
function appendValue(value) {
  if (value === ".") {
    if (operator === null && firstValue.includes(".")) return;
    if (operator !== null && secondValue.includes(".")) return;
  }

  if (operator === null) {
    firstValue += value;
    display.value = firstValue;
  } else {
    secondValue += value;
    display.value = secondValue;
  }
}

// Set operator
function setOperator(op) {
  if (firstValue === "") return;
  if (secondValue !== "") calculate(); // chain calculation
  operator = op;
}

// Calculate result
function calculate() {
  let num1 = parseFloat(firstValue);
  let num2 = parseFloat(secondValue);

  if (isNaN(num1) || isNaN(num2)) return;

  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        display.value = "Error";
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }

  display.value = result;

  // reset for next calculation
  firstValue = result.toString();
  secondValue = "";
  operator = null;
}

// Clear all
function clearDisplay() {
  firstValue = "";
  secondValue = "";
  operator = null;
  display.value = "";
}

// Backspace
function backspace() {
  if (operator === null) {
    firstValue = firstValue.slice(0, -1);
    display.value = firstValue;
  } else {
    secondValue = secondValue.slice(0, -1);
    display.value = secondValue;
  }
}

// Keyboard support
document.addEventListener("keydown", function(e) {
  if (!isNaN(e.key) || e.key === ".") appendValue(e.key);

  if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);

  if (e.key === "Enter") calculate();

  if (e.key === "Backspace") backspace();

  if (e.key === "Escape") clearDisplay();
});