/**
 * Basic UI Calculator
 * A simple, soft-design calculator with four arithmetic operations.
 */

// Calculator State Object
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
    hasError: false
};

// DOM Elements
let displayElement;

/**
 * Update the calculator display with current value
 */
function updateDisplay() {
    displayElement.textContent = calculator.displayValue;
}

/**
 * Reset calculator to initial state
 */
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    calculator.hasError = false;
    updateDisplay();
}

/**
 * Input a digit (0-9)
 * @param {string} digit - The digit to input
 */
function inputDigit(digit) {
    // Clear error state on new input
    if (calculator.hasError) {
        resetCalculator();
    }

    // Validate digit
    if (!/^[0-9]$/.test(digit)) {
        return;
    }

    // Limit to 12 digits to prevent overflow
    if (calculator.displayValue.replace(/[^0-9]/g, '').length >= 12 &&
        !calculator.waitingForSecondOperand) {
        return;
    }

    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = calculator.displayValue === '0'
            ? digit
            : calculator.displayValue + digit;
    }

    updateDisplay();
}

/**
 * Input decimal point
 */
function inputDecimal() {
    // Clear error state on new input
    if (calculator.hasError) {
        resetCalculator();
    }

    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        updateDisplay();
        return;
    }

    // Prevent multiple decimal points
    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
        updateDisplay();
    }
}

/**
 * Handle operator button press
 * @param {string} nextOperator - The operator (+, -, *, /)
 */
function handleOperator(nextOperator) {
    // Clear error state on new input
    if (calculator.hasError) {
        resetCalculator();
        return;
    }

    const inputValue = parseFloat(calculator.displayValue);

    // If there's a pending operation and we're not waiting, calculate first
    if (calculator.operator && !calculator.waitingForSecondOperand) {
        const result = calculate(calculator.firstOperand, inputValue, calculator.operator);

        // Check for error
        if (typeof result === 'string') {
            calculator.displayValue = result;
            calculator.hasError = true;
            calculator.firstOperand = null;
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
            updateDisplay();
            return;
        }

        calculator.displayValue = formatResult(result);
        calculator.firstOperand = result;
    } else {
        calculator.firstOperand = inputValue;
    }

    calculator.operator = nextOperator;
    calculator.waitingForSecondOperand = true;
    updateDisplay();
}

/**
 * Perform calculation
 * @param {number} first - First operand
 * @param {number} second - Second operand
 * @param {string} operator - The operator
 * @returns {number|string} - Result or error message
 */
function calculate(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            if (second === 0) {
                return 'Cannot divide by zero';
            }
            return first / second;
        default:
            return second;
    }
}

/**
 * Format result for display
 * @param {number} result - The calculation result
 * @returns {string} - Formatted result string
 */
function formatResult(result) {
    // Check for overflow
    if (!isFinite(result)) {
        return 'Overflow';
    }

    // Convert to string and limit length
    let resultString = String(result);

    // If result is too long, use scientific notation or truncate
    if (resultString.length > 12) {
        if (Math.abs(result) >= 1e12 || (Math.abs(result) < 1e-6 && result !== 0)) {
            resultString = result.toExponential(6);
        } else {
            // Truncate decimal places
            const decimalIndex = resultString.indexOf('.');
            if (decimalIndex !== -1) {
                const maxDecimals = 12 - decimalIndex - 1;
                resultString = result.toFixed(Math.max(0, maxDecimals));
                // Remove trailing zeros
                resultString = parseFloat(resultString).toString();
            }
        }
    }

    return resultString;
}

/**
 * Handle equals button - execute calculation
 */
function handleEquals() {
    if (calculator.hasError) {
        return;
    }

    if (calculator.operator === null) {
        return;
    }

    const inputValue = parseFloat(calculator.displayValue);
    const result = calculate(calculator.firstOperand, inputValue, calculator.operator);

    // Check for error
    if (typeof result === 'string') {
        calculator.displayValue = result;
        calculator.hasError = true;
        calculator.firstOperand = null;
        calculator.operator = null;
        calculator.waitingForSecondOperand = false;
        updateDisplay();
        return;
    }

    calculator.displayValue = formatResult(result);
    calculator.firstOperand = result;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    updateDisplay();
}

/**
 * Handle button click events
 * @param {Event} event - Click event
 */
function handleButtonClick(event) {
    const button = event.target;

    if (!button.matches('button')) {
        return;
    }

    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
        case 'number':
            inputDigit(value);
            break;
        case 'decimal':
            inputDecimal();
            break;
        case 'operator':
            handleOperator(value);
            break;
        case 'equals':
            handleEquals();
            break;
        case 'clear':
            resetCalculator();
            break;
    }
}

/**
 * Handle keyboard input
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboard(event) {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        inputDigit(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        resetCalculator();
    }
}

/**
 * Initialize the calculator
 */
function init() {
    displayElement = document.getElementById('display');

    // Bind button click events using event delegation
    const buttonsContainer = document.querySelector('.buttons');
    buttonsContainer.addEventListener('click', handleButtonClick);

    // Bind keyboard events
    document.addEventListener('keydown', handleKeyboard);

    // Initialize display
    updateDisplay();
}

// Get calculator state (for testing)
function getState() {
    return { ...calculator };
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
