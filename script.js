let currentInput = '';
let history = [];

const display = document.getElementById('display');

function inputNumber(num) {
  if (display.value === '0' || currentInput === '0') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  display.value = currentInput;
}

function setOperator(op) {
  if (currentInput === '') return;
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '×', '÷'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  display.value = currentInput;
}

function inputDecimal() {
  const parts = currentInput.split(/[\+\-\×\÷]/);
  if (!parts[parts.length - 1].includes('.')) {
    currentInput += '.';
    display.value = currentInput;
  }
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput || '0';
}

function clearAll() {
  currentInput = '';
  display.value = '0';
}

function percentage() {
  if (currentInput) {
    const result = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/')) / 100;
    display.value = result;
    currentInput = result.toString();
  }
}

function calculate() {
  try {
    const result = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/'));
    history.push(`${currentInput} = ${result}`);
    updateHistory();
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = 'Error';
    currentInput = '';
  }
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.slice(-10).reverse().forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function toggleHistory() {
  document.getElementById('history-panel').classList.toggle('show');
}
