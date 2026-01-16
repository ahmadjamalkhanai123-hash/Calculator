# Data Model: Basic UI Calculator

**Feature**: 1-calculator-ui
**Date**: 2026-01-16

## Overview

The calculator uses a simple state machine pattern with a single state object. No persistent storage is required - all state is held in memory during the session.

## State Entity

### CalculatorState

The core state object that tracks the current calculation.

```javascript
CalculatorState {
  displayValue: string      // Current value shown on display (default: "0")
  firstOperand: number|null // First number in calculation (null if not set)
  operator: string|null     // Current operator (+, -, *, /) (null if not set)
  waitingForSecondOperand: boolean // True after operator pressed
}
```

**State Transitions**:

| Current State | Action | Next State |
|--------------|--------|------------|
| Initial (`displayValue: "0"`) | Number pressed | `displayValue: "<number>"` |
| Number entered | Operator pressed | `firstOperand: <number>`, `operator: <op>`, `waitingForSecondOperand: true` |
| Waiting for second | Number pressed | `displayValue: "<number>"`, `waitingForSecondOperand: false` |
| Second number entered | Equals pressed | Calculate, `displayValue: <result>`, reset operands |
| Second number entered | Operator pressed | Calculate, store result, `operator: <new_op>` |
| Any state | Clear pressed | Reset to initial state |
| Error state | Any number pressed | Clear error, start new input |

---

## UI Entities

### Button

Represents a calculator button.

| Property | Type | Description |
|----------|------|-------------|
| value | string | The display label ("0"-"9", "+", "-", "*", "/", "=", "C", ".") |
| type | enum | `number`, `operator`, `equals`, `clear`, `decimal` |
| action | function | Handler function when clicked |

### Display

Represents the calculator display area.

| Property | Type | Description |
|----------|------|-------------|
| value | string | Current text to display |
| isError | boolean | True if displaying an error message |

---

## Validation Rules

### Number Input
- Only digits 0-9 and decimal point allowed
- Maximum one decimal point per number
- Leading zeros stripped (except "0.x")
- Maximum 12 digits to prevent overflow display

### Operator Input
- Only +, -, *, / allowed
- Operator can be changed before second operand entered
- Chained operations evaluate left-to-right

### Calculation
- Division by zero returns error state
- Results exceeding display capacity show "Overflow"
- Decimal results truncated to fit display

---

## Error States

| Error | Trigger | Display Message | Recovery |
|-------|---------|-----------------|----------|
| DivisionByZero | `x / 0` | "Cannot divide by zero" | Any number input clears |
| Overflow | Result > max display | "Overflow" | Any number input clears |
| InvalidState | Malformed calculation | Display "0" | Automatic reset |

---

## Relationships

```
┌─────────────────┐
│ CalculatorState │
├─────────────────┤
│ displayValue    │◄────── Display shows this value
│ firstOperand    │
│ operator        │
│ waitingFor...   │
└─────────────────┘
        │
        │ Updated by
        ▼
┌─────────────────┐
│    Buttons      │
├─────────────────┤
│ Number (0-9, .) │
│ Operator (+,-,*,/)│
│ Equals (=)      │
│ Clear (C)       │
└─────────────────┘
```
