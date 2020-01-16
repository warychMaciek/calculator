class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.clearEverything();
    }

    clear() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
    }

    clearEverything() {
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentNumber.includes('.')) return;
        this.currentNumber = this.currentNumber.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentNumber === '') return;
        if (this.previousNumber !== '') {
            this.compute(); 
        }
        this.operation = operation;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousNumber);
        const current = parseFloat(this.currentNumber);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+': 
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default: 
                return;
        }
        this.currentNumber = computation;
        this.operation = undefined;
        this.previousNumber = '';
    }

    updateDisplay() {
        this.currentElement.innerText = this.currentNumber;
        if (this.operation != null) {
            this.previousElement.innerText = `${this.previousNumber} ${this.operation}`;
        } else {
            this.previousElement.innerText = '';
        }
    }

    sqrt() {
        if (this.currentNumber === '') return;
        this.currentNumber = Math.sqrt(parseFloat(this.currentNumber));
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const clearEverythingButton = document.querySelector('[data-clear-everything]');
const previousElement = document.querySelector('[data-previous]');
const currentElement = document.querySelector('[data-current]');
const sqrtButton = document.querySelector('[data-sqrt]');

const calculator = new Calculator(previousElement, currentElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearEverythingButton.addEventListener('click', button => {
    calculator.clearEverything();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

sqrtButton.addEventListener('click', button => {
    calculator.sqrt();
    calculator.updateDisplay();
})