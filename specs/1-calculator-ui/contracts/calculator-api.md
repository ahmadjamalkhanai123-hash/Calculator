# Calculator Internal API Contract

**Feature**: 1-calculator-ui
**Date**: 2026-01-16

## Overview

This document defines the internal JavaScript API for the calculator. Since this is a client-side only application with no backend, this serves as the contract for the JavaScript module interface.

---

## Calculator Module API

### `Calculator.init(displayElement)`

Initialize the calculator and bind to the display element.

**Parameters**:
| Name | Type | Description |
|------|------|-------------|
| displayElement | HTMLElement | The DOM element for the display |

**Returns**: void

**Side Effects**: Sets up event listeners, initializes state

---

### `Calculator.inputDigit(digit)`

Handle digit button press (0-9).

**Parameters**:
| Name | Type | Description |
|------|------|-------------|
| digit | string | Single digit "0"-"9" |

**Returns**: void

**Behavior**:
- If waiting for second operand, start new number
- Otherwise append to current display
- Update display

---

### `Calculator.inputDecimal()`

Handle decimal point button press.

**Parameters**: none

**Returns**: void

**Behavior**:
- If display already contains ".", ignore
- If waiting for second operand, start with "0."
- Otherwise append "." to display

---

### `Calculator.handleOperator(operator)`

Handle operator button press (+, -, *, /).

**Parameters**:
| Name | Type | Description |
|------|------|-------------|
| operator | string | One of "+", "-", "*", "/" |

**Returns**: void

**Behavior**:
- If first operand exists and not waiting, calculate first
- Store current display as first operand
- Store operator
- Set waiting for second operand

---

### `Calculator.calculate()`

Execute the pending calculation (equals button).

**Parameters**: none

**Returns**: void

**Behavior**:
- If no operator pending, do nothing
- If division by zero, show error
- Calculate result
- Display result
- Reset state (result becomes new first operand if chaining)

---

### `Calculator.clear()`

Reset calculator to initial state (C button).

**Parameters**: none

**Returns**: void

**Behavior**:
- Reset displayValue to "0"
- Reset firstOperand to null
- Reset operator to null
- Reset waitingForSecondOperand to false

---

### `Calculator.getState()`

Get current calculator state (for testing).

**Parameters**: none

**Returns**:
```javascript
{
  displayValue: string,
  firstOperand: number|null,
  operator: string|null,
  waitingForSecondOperand: boolean
}
```

---

## Event Handling Contract

### Button Click Events

All buttons trigger click events that call the appropriate Calculator method:

| Button Class | Method Called |
|--------------|---------------|
| `.btn-number` | `Calculator.inputDigit(button.value)` |
| `.btn-decimal` | `Calculator.inputDecimal()` |
| `.btn-operator` | `Calculator.handleOperator(button.value)` |
| `.btn-equals` | `Calculator.calculate()` |
| `.btn-clear` | `Calculator.clear()` |

### Keyboard Events (Optional Enhancement)

| Key | Action |
|-----|--------|
| 0-9 | inputDigit |
| . | inputDecimal |
| +, -, *, / | handleOperator |
| Enter, = | calculate |
| Escape, c, C | clear |

---

## Error Contract

### DivisionByZeroError

**Trigger**: `handleOperator` or `calculate` when dividing by 0

**Response**:
- Display shows "Cannot divide by zero"
- State resets on next digit input
- Clear button also resets

### OverflowError

**Trigger**: Result exceeds 12 digits

**Response**:
- Display shows "Overflow"
- State resets on next digit input
