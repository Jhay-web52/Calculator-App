
        let currentInput = '0';
        let previousInput = null;
        let operator = null;
        let waitingForOperand = false;
        
        const display = document.getElementById('display');
        
        function updateDisplay() {
            display.value = currentInput;
        }
        
        function inputNumber(num) {
            if (waitingForOperand) {
                currentInput = num;
                waitingForOperand = false;
            } else {
                currentInput = currentInput === '0' ? num : currentInput + num;
            }
            updateDisplay();
        }
        
        function inputDecimal() {
            if (waitingForOperand) {
                currentInput = '0.';
                waitingForOperand = false;
            } else if (currentInput.indexOf('.') === -1) {
                currentInput += '.';
            }
            updateDisplay();
        }
        
        function clearAll() {
            currentInput = '0';
            previousInput = null;
            operator = null;
            waitingForOperand = false;
            updateDisplay();
        }
        
        function deleteLast() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }
        
        function percentage() {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
        }
        
        function setOperator(nextOperator) {
            const inputValue = parseFloat(currentInput);
            
            if (previousInput === null) {
                previousInput = inputValue;
            } else if (operator) {
                const result = performCalculation();
                currentInput = String(result);
                previousInput = result;
                updateDisplay();
            }
            
            waitingForOperand = true;
            operator = nextOperator;
        }
        
        function calculate() {
            if (operator && previousInput !== null && !waitingForOperand) {
                const result = performCalculation();
                currentInput = String(result);
                previousInput = null;
                operator = null;
                waitingForOperand = true;
                updateDisplay();
            }
        }
        
        function performCalculation() {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            
            switch (operator) {
                case '+':
                    return prev + current;
                case '-':
                    return prev - current;
                case '×':
                    return prev * current;
                case '÷':
                    return current !== 0 ? prev / current : 0;
                default:
                    return current;
            }
        }
        
        // Keyboard support
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                inputNumber(key);
            } else if (key === '.') {
                inputDecimal();
            } else if (key === '+') {
                setOperator('+');
            } else if (key === '-') {
                setOperator('-');
            } else if (key === '*') {
                setOperator('×');
            } else if (key === '/') {
                event.preventDefault();
                setOperator('÷');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearAll();
            } else if (key === 'Backspace') {
                deleteLast();
            } else if (key === '%') {
                percentage();
            }
        });
        
        // Initial display
        updateDisplay();