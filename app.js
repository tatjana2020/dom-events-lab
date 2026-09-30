/*-------------------------------- Constants --------------------------------*/
const calculator = document.querySelector('#calculator');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

/*-------------------------------- Variables --------------------------------*/
let firstNumber = '';   
let secondNumber = '';  
let operator = '';     

/*------------------------------- Functions ---------------------------------*/
function updateDisplay(value) {
  display.innerText = value;
}

function calculate(a, b, op) {
  const x = Number(a);
  const y = Number(b);

  switch (op) {
    case '+':
      return x + y;
    case '-':
      return x - y;
    case '*':
      return x * y;
    case '/':
      return y === 0 ? 'Error' : x / y;
    default:
      return y;
  }
}

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  updateDisplay('0');
}

function handleNumber(digit) {
  if (operator === '') {
    firstNumber = firstNumber === '0' ? digit : firstNumber + digit;
    updateDisplay(firstNumber);
  } else {
    secondNumber = secondNumber === '0' ? digit : secondNumber + digit;
    updateDisplay(secondNumber);
  }
}

function handleOperator(op) {
  if (op === 'C') {
    clearAll();
    return;
  }

  if (firstNumber === '' || firstNumber === 'Error') return;

  if (secondNumber !== '') {
    const result = calculate(firstNumber, secondNumber, operator);
    firstNumber = String(result);
    secondNumber = '';
    updateDisplay(firstNumber);
    if (firstNumber === 'Error') return;
  }

  operator = op;
}

function handleEquals() {
  if (firstNumber === '' || operator === '' || secondNumber === '') return;

  const result = calculate(firstNumber, secondNumber, operator);
  updateDisplay(result);

  firstNumber = result === 'Error' ? '' : String(result);
  secondNumber = '';
  operator = '';
}

/*----------------------------- Event Listeners -----------------------------*/

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log(event.target.innerText);
  });
});
calculator.addEventListener('click', (event) => {
  if (!event.target.classList.contains('button')) return;
  if (event.target.classList.contains('number')) {
    handleNumber(event.target.innerText);
  }
  if (event.target.classList.contains('operator')) {
    handleOperator(event.target.innerText);
  }
  if (event.target.classList.contains('equals')) {
    handleEquals();
  }
});

/*------------------------------- Init --------------------------------------*/
updateDisplay('0');
