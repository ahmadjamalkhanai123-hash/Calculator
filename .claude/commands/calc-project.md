---
description: Reusable intelligence for the Calculator project - provides context, patterns, guidance, and can recreate the calculator in any project.
handoffs:
  - label: Create Feature Spec
    agent: sp.specify
    prompt: Create a specification for a new calculator feature
  - label: Plan Implementation
    agent: sp.plan
    prompt: Plan the implementation based on current architecture
  - label: Generate Tasks
    agent: sp.tasks
    prompt: Break down the work into actionable tasks
  - label: Commit Changes
    agent: sp.git.commit_pr
    prompt: Commit and create PR for calculator changes
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

---

## SKILL MODES

This skill operates in different modes based on user input:

### Mode 1: RECREATE / SCAFFOLD
**Trigger words**: "recreate", "scaffold", "create", "generate", "new project", "build calculator"

When user wants to recreate the calculator in a new project:
1. Read the complete source templates from `.specify/intelligence/source-templates/`
2. Create the target directory structure
3. Write all three files (index.html, styles.css, script.js)
4. Report completion with file paths

**Example commands:**
```
/calc-project recreate in ./my-new-calculator
/calc-project scaffold calculator at C:/Projects/NewCalc
/calc-project create new calculator project
```

### Mode 2: INTELLIGENCE / GUIDANCE
**Trigger words**: Any other query (features, bugs, patterns, etc.)

Provide project context, patterns, and development guidance.

---

## RECREATE CALCULATOR - Complete Source Code

When recreating the calculator, use these exact source files:

### File 1: index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="buttons">
            <!-- Row 1: C, and operators on right -->
            <button class="btn btn-clear" data-action="clear">C</button>
            <button class="btn btn-function" data-action="sign">±</button>
            <button class="btn btn-function" data-action="percent">%</button>
            <button class="btn btn-operator" data-action="operator" data-value="/">÷</button>

            <!-- Row 2: 7, 8, 9, × -->
            <button class="btn btn-number" data-action="number" data-value="7">7</button>
            <button class="btn btn-number" data-action="number" data-value="8">8</button>
            <button class="btn btn-number" data-action="number" data-value="9">9</button>
            <button class="btn btn-operator" data-action="operator" data-value="*">×</button>

            <!-- Row 3: 4, 5, 6, - -->
            <button class="btn btn-number" data-action="number" data-value="4">4</button>
            <button class="btn btn-number" data-action="number" data-value="5">5</button>
            <button class="btn btn-number" data-action="number" data-value="6">6</button>
            <button class="btn btn-operator" data-action="operator" data-value="-">−</button>

            <!-- Row 4: 1, 2, 3, + -->
            <button class="btn btn-number" data-action="number" data-value="1">1</button>
            <button class="btn btn-number" data-action="number" data-value="2">2</button>
            <button class="btn btn-number" data-action="number" data-value="3">3</button>
            <button class="btn btn-operator" data-action="operator" data-value="+">+</button>

            <!-- Row 5: 0 (spans 2), ., = -->
            <button class="btn btn-number btn-zero" data-action="number" data-value="0">0</button>
            <button class="btn btn-number" data-action="decimal">.</button>
            <button class="btn btn-equals" data-action="equals">=</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### File 2: styles.css

```css
/* CSS Reset and Custom Properties (Design Tokens) */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* Colors - Soft Design Palette */
    --color-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --color-calculator-bg: #2d2d3a;
    --color-display-bg: #1c1c28;
    --color-display-text: #ffffff;
    --color-btn-number: #3d3d4d;
    --color-btn-number-hover: #4d4d5d;
    --color-btn-number-active: #5d5d6d;
    --color-btn-function: #505060;
    --color-btn-function-hover: #606070;
    --color-btn-function-active: #707080;
    --color-btn-operator: #ff9f0a;
    --color-btn-operator-hover: #ffb340;
    --color-btn-operator-active: #cc7f08;
    --color-btn-equals: #ff9f0a;
    --color-text-dark: #ffffff;
    --color-text-light: #ffffff;
    --color-text-function: #ffffff;

    /* Soft Design Elements */
    --radius-btn: 50%;
    --radius-calculator: 30px;
    --radius-display: 15px;
    --shadow-soft: 0 4px 15px rgba(0, 0, 0, 0.2);
    --shadow-calculator: 0 25px 50px rgba(0, 0, 0, 0.3);
    --shadow-btn: 0 6px 20px rgba(0, 0, 0, 0.15);
    --shadow-btn-active: inset 0 2px 4px rgba(0, 0, 0, 0.3);

    /* Transitions */
    --transition-fast: 0.2s ease;

    /* Sizing */
    --btn-size: 65px;
    --btn-gap: 12px;
    --display-height: 120px;
    --font-display: 3rem;
    --font-btn: 1.5rem;
}

/* Body */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: var(--color-bg);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

/* Calculator Container */
.calculator {
    background-color: var(--color-calculator-bg);
    border-radius: var(--radius-calculator);
    box-shadow: var(--shadow-calculator);
    padding: 25px;
    width: 100%;
    max-width: 340px;
}

/* Display Area */
.display {
    background-color: var(--color-display-bg);
    color: var(--color-display-text);
    font-size: var(--font-display);
    font-weight: 300;
    text-align: right;
    padding: 25px 20px;
    border-radius: var(--radius-display);
    margin-bottom: 20px;
    min-height: var(--display-height);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    overflow: hidden;
    word-break: break-all;
    box-shadow: var(--shadow-soft);
}

/* Button Grid - Standard 4 column layout */
.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--btn-gap);
}

/* Button Base Styles */
.btn {
    height: var(--btn-size);
    width: var(--btn-size);
    font-size: var(--font-btn);
    border: none;
    border-radius: var(--radius-btn);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-weight: 500;
    box-shadow: var(--shadow-btn);
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn:focus {
    outline: none;
}

.btn:hover {
    transform: translateY(-2px);
}

.btn:active {
    transform: translateY(0) scale(0.95);
}

/* Number Buttons - Dark soft design */
.btn-number {
    background-color: var(--color-btn-number);
    color: var(--color-text-dark);
}

.btn-number:hover {
    background-color: var(--color-btn-number-hover);
}

.btn-number:active {
    background-color: var(--color-btn-number-active);
    box-shadow: var(--shadow-btn-active);
}

/* Function Buttons (C, ±, %) - Slightly lighter */
.btn-clear,
.btn-function {
    background-color: var(--color-btn-function);
    color: var(--color-text-function);
}

.btn-clear:hover,
.btn-function:hover {
    background-color: var(--color-btn-function-hover);
}

.btn-clear:active,
.btn-function:active {
    background-color: var(--color-btn-function-active);
    box-shadow: var(--shadow-btn-active);
}

/* Operator Buttons - Orange accent (right column) */
.btn-operator {
    background-color: var(--color-btn-operator);
    color: var(--color-text-light);
}

.btn-operator:hover {
    background-color: var(--color-btn-operator-hover);
}

.btn-operator:active {
    background-color: var(--color-btn-operator-active);
    box-shadow: var(--shadow-btn-active);
}

/* Active operator state */
.btn-operator.active {
    background-color: var(--color-text-light);
    color: var(--color-btn-operator);
}

/* Equals Button - Same as operators */
.btn-equals {
    background-color: var(--color-btn-equals);
    color: var(--color-text-light);
}

.btn-equals:hover {
    background-color: var(--color-btn-operator-hover);
}

.btn-equals:active {
    background-color: var(--color-btn-operator-active);
    box-shadow: var(--shadow-btn-active);
}

/* Zero Button - Spans Two Columns, pill shape */
.btn-zero {
    grid-column: span 2;
    width: 100%;
    border-radius: 35px;
    justify-content: flex-start;
    padding-left: 28px;
}

/* Responsive adjustments */
@media (max-width: 400px) {
    :root {
        --btn-size: 55px;
        --font-display: 2.5rem;
        --font-btn: 1.25rem;
        --btn-gap: 10px;
    }

    .calculator {
        padding: 20px;
        border-radius: 25px;
    }

    .btn-zero {
        padding-left: 22px;
    }
}

/* Animation for button press */
@keyframes buttonPress {
    0% { transform: scale(1); }
    50% { transform: scale(0.92); }
    100% { transform: scale(1); }
}

.btn:active {
    animation: buttonPress 0.1s ease-out;
}
```

### File 3: script.js

```javascript
/**
 * Basic UI Calculator
 * A soft-design calculator with standard layout - operations on right column.
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
    clearActiveOperator();
    updateDisplay();
}

/**
 * Input a digit (0-9)
 * @param {string} digit - The digit to input
 */
function inputDigit(digit) {
    if (calculator.hasError) {
        resetCalculator();
    }

    if (!/^[0-9]$/.test(digit)) {
        return;
    }

    if (calculator.displayValue.replace(/[^0-9]/g, '').length >= 12 &&
        !calculator.waitingForSecondOperand) {
        return;
    }

    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
        clearActiveOperator();
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
    if (calculator.hasError) {
        resetCalculator();
    }

    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        clearActiveOperator();
        updateDisplay();
        return;
    }

    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
        updateDisplay();
    }
}

/**
 * Toggle sign of current number (±)
 */
function toggleSign() {
    if (calculator.hasError) {
        return;
    }

    if (calculator.displayValue === '0') {
        return;
    }

    if (calculator.displayValue.startsWith('-')) {
        calculator.displayValue = calculator.displayValue.substring(1);
    } else {
        calculator.displayValue = '-' + calculator.displayValue;
    }

    updateDisplay();
}

/**
 * Calculate percentage of current number
 */
function handlePercent() {
    if (calculator.hasError) {
        return;
    }

    const currentValue = parseFloat(calculator.displayValue);
    const result = currentValue / 100;

    calculator.displayValue = formatResult(result);
    updateDisplay();
}

/**
 * Clear active state from all operator buttons
 */
function clearActiveOperator() {
    const operators = document.querySelectorAll('.btn-operator');
    operators.forEach(op => op.classList.remove('active'));
}

/**
 * Set active state on operator button
 * @param {string} operator - The operator value
 */
function setActiveOperator(operator) {
    clearActiveOperator();
    const operatorBtn = document.querySelector(`.btn-operator[data-value="${operator}"]`);
    if (operatorBtn) {
        operatorBtn.classList.add('active');
    }
}

/**
 * Handle operator button press
 * @param {string} nextOperator - The operator (+, -, *, /)
 */
function handleOperator(nextOperator) {
    if (calculator.hasError) {
        resetCalculator();
        return;
    }

    const inputValue = parseFloat(calculator.displayValue);

    if (calculator.operator && !calculator.waitingForSecondOperand) {
        const result = calculate(calculator.firstOperand, inputValue, calculator.operator);

        if (typeof result === 'string') {
            calculator.displayValue = result;
            calculator.hasError = true;
            calculator.firstOperand = null;
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
            clearActiveOperator();
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
    setActiveOperator(nextOperator);
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
                return 'Error';
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
    if (!isFinite(result)) {
        return 'Error';
    }

    let resultString = String(result);

    if (resultString.length > 12) {
        if (Math.abs(result) >= 1e12 || (Math.abs(result) < 1e-6 && result !== 0)) {
            resultString = result.toExponential(6);
        } else {
            const decimalIndex = resultString.indexOf('.');
            if (decimalIndex !== -1) {
                const maxDecimals = 12 - decimalIndex - 1;
                resultString = result.toFixed(Math.max(0, maxDecimals));
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

    if (typeof result === 'string') {
        calculator.displayValue = result;
        calculator.hasError = true;
        calculator.firstOperand = null;
        calculator.operator = null;
        calculator.waitingForSecondOperand = false;
        clearActiveOperator();
        updateDisplay();
        return;
    }

    calculator.displayValue = formatResult(result);
    calculator.firstOperand = result;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    clearActiveOperator();
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
        case 'sign':
            toggleSign();
            break;
        case 'percent':
            handlePercent();
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
    } else if (key === '%') {
        handlePercent();
    }
}

/**
 * Initialize the calculator
 */
function init() {
    displayElement = document.getElementById('display');

    const buttonsContainer = document.querySelector('.buttons');
    buttonsContainer.addEventListener('click', handleButtonClick);

    document.addEventListener('keydown', handleKeyboard);

    updateDisplay();
}

// Get calculator state (for testing)
function getState() {
    return { ...calculator };
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
```

---

## RECREATION EXECUTION FLOW

When user requests recreation:

1. **Parse target path** from $ARGUMENTS
   - If no path specified, use `./calculator` as default
   - Support both relative and absolute paths

2. **Create directory structure**:
   ```
   {target-path}/
   ├── index.html
   ├── styles.css
   └── script.js
   ```

3. **Write files** using the source code above

4. **Report completion**:
   ```
   ✅ Calculator recreated successfully!

   Location: {target-path}/
   Files created:
   - index.html (UI structure)
   - styles.css (styling)
   - script.js (logic)

   To run: Open index.html in a browser
   ```

---

## Calculator Project Intelligence

### Project Overview

**Name**: Basic UI Calculator
**Type**: Web-based calculator application
**Tech Stack**: HTML5, CSS3, Vanilla JavaScript (no frameworks)
**Design**: Modern soft design with dark theme

### UI Layout (Standard Calculator)

```
┌─────────────────────────┐
│                       0 │  Display
├─────┬─────┬─────┬───────┤
│  C  │  ±  │  %  │   ÷   │  Row 1: Functions + Divide
├─────┼─────┼─────┼───────┤
│  7  │  8  │  9  │   ×   │  Row 2: Numbers + Multiply
├─────┼─────┼─────┼───────┤
│  4  │  5  │  6  │   −   │  Row 3: Numbers + Subtract
├─────┼─────┼─────┼───────┤
│  1  │  2  │  3  │   +   │  Row 4: Numbers + Add
├─────┴─────┼─────┼───────┤
│     0     │  .  │   =   │  Row 5: Zero + Decimal + Equals
└───────────┴─────┴───────┘
```

### Core Features

| Feature | Description | Handler Function |
|---------|-------------|------------------|
| Numbers (0-9) | Input digits | `inputDigit(digit)` |
| Decimal (.) | Add decimal point | `inputDecimal()` |
| Operations (+−×÷) | Arithmetic operations | `handleOperator(op)` |
| Equals (=) | Execute calculation | `handleEquals()` |
| Clear (C) | Reset calculator | `resetCalculator()` |
| Toggle Sign (±) | Positive/negative | `toggleSign()` |
| Percent (%) | Divide by 100 | `handlePercent()` |

### State Management

```javascript
const calculator = {
    displayValue: '0',           // Current display value
    firstOperand: null,          // First number in operation
    operator: null,              // Current operator (+, -, *, /)
    waitingForSecondOperand: false,  // Awaiting second number
    hasError: false              // Error state flag
};
```

---

## Usage Examples

**Recreate calculator in a new location:**
```
/calc-project recreate in ./my-calculator
/calc-project scaffold at C:/Projects/NewCalc
/calc-project create calculator
```

**Get project guidance:**
```
/calc-project I want to add memory functions
/calc-project Explain the state management
/calc-project How do I change the button colors?
```

---

## Skill Location

This skill is located at:
```
.claude/commands/calc-project.md
```

Supporting intelligence files:
```
.specify/intelligence/calculator-patterns.md
.specify/intelligence/quickstart.md
```

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.
