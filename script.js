const currDisplay = document.querySelector('.curr-display');
const prevDisplay = document.querySelector('.prev-display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operation');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.delete');
const equalBtn = document.querySelector('.equal');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand += number;
  updateDisplay();
}

function chooseOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
}

function updateDisplay() {
  currDisplay.innerText = currentOperand;
  prevDisplay.innerText = operation ? `${previousOperand} ${operation}` : '';
}

function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;
  updateDisplay();
}

function deleteLast() {
  currentOperand = currentOperand.toString().slice(0, -1);
  updateDisplay();
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
  });
});

clearBtn.addEventListener('click', clear);
equalBtn.addEventListener('click', () => {
  compute();
  updateDisplay();
});
delBtn.addEventListener('click', deleteLast);
