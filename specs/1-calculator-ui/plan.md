# Implementation Plan: Basic UI Calculator

**Branch**: `1-calculator-ui` | **Date**: 2026-01-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/1-calculator-ui/spec.md`

## Summary

Build a simple, soft-design web-based calculator with four arithmetic operations (add, subtract, multiply, divide), division by zero handling, input validation, and chained calculation support. Uses vanilla HTML, CSS, and JavaScript with no external dependencies.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript ES6+
**Primary Dependencies**: None (vanilla implementation)
**Storage**: N/A (in-memory state only)
**Testing**: Manual browser testing + optional Jest for unit tests
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Single page web application
**Performance Goals**: Instant response (<16ms for 60fps UI)
**Constraints**: No external dependencies, single HTML file loadable
**Scale/Scope**: Single user, local execution

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Implementation |
|-----------|-------------|--------|----------------|
| I. Input Validation First | Validate all inputs before operations | PASS | `inputDigit()` and `inputDecimal()` validate before state update |
| II. Error Handling | Handle all errors gracefully | PASS | Division by zero shows message, clears on next input |
| III. Simplicity | Minimum viable implementation | PASS | Vanilla JS, no frameworks, 3 files total |
| IV. Testability | All functionality independently testable | PASS | `Calculator.getState()` exposed, pure functions for math |

**All gates passed. Proceeding with implementation.**

## Project Structure

### Documentation (this feature)

```text
specs/1-calculator-ui/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Technology decisions
├── data-model.md        # State and entity model
├── quickstart.md        # Getting started guide
├── contracts/           # API contracts
│   └── calculator-api.md
├── checklists/
│   └── requirements.md  # Quality checklist
└── tasks.md             # Task list (created by /sp.tasks)
```

### Source Code (repository root)

```text
calculator-ui/
├── index.html           # HTML structure with button grid
├── styles.css           # Soft design styling
└── script.js            # Calculator state and logic
```

**Structure Decision**: Single-page web application with 3 separate files for maintainability. No build process required - files can be opened directly in browser.

## Design Overview

### Visual Design (Simple and Soft)

```
┌─────────────────────────────────┐
│                               0 │  ← Display (white, soft shadow)
├─────────────────────────────────┤
│  C  │     │     │  /  │         │  ← Clear and operators
├─────┼─────┼─────┼─────┤         │
│  7  │  8  │  9  │  *  │         │
├─────┼─────┼─────┼─────┤         │
│  4  │  5  │  6  │  -  │         │
├─────┼─────┼─────┼─────┤         │
│  1  │  2  │  3  │  +  │         │
├─────┴─────┼─────┼─────┤         │
│     0     │  .  │  =  │         │  ← 0 spans two columns
└───────────┴─────┴─────┘
```

### Color Palette (Soft Design)

| Element | Color | Purpose |
|---------|-------|---------|
| Background | `#f5f5f5` | Soft gray, easy on eyes |
| Display | `#ffffff` | Clean white with shadow |
| Number buttons | `#e8e8e8` | Light gray, subtle |
| Operator buttons | `#ff9500` | Orange accent (standard calc) |
| Equals button | `#ff9500` | Orange accent |
| Clear button | `#ff3b30` | Red for destructive action |
| Text | `#333333` | Dark gray, readable |

### Soft Design Elements

- **Border radius**: 12px for buttons, 16px for calculator body
- **Shadows**: Subtle `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
- **Button hover**: Slightly darker with smooth transition
- **Button active**: Inset shadow for pressed effect
- **Font**: System font stack for native feel

## Architecture

### State Machine

```
┌────────────┐     digit      ┌─────────────────┐
│   INITIAL  │ ──────────────►│ ENTERING_FIRST  │
│ display: 0 │                │ display: <num>  │
└────────────┘                └─────────────────┘
      ▲                              │
      │ clear                        │ operator
      │                              ▼
┌─────┴──────┐    calculate   ┌─────────────────┐
│   RESULT   │◄───────────────│ WAITING_SECOND  │
│ display: x │                │ operator stored │
└────────────┘                └─────────────────┘
      │                              │
      │ operator                     │ digit
      ▼                              ▼
┌────────────┐                ┌─────────────────┐
│  CHAINING  │◄───────────────│ ENTERING_SECOND │
│ result→op  │    operator    │ display: <num>  │
└────────────┘                └─────────────────┘
```

### Module Structure (script.js)

```javascript
// State object
const calculator = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false
};

// Core functions
function inputDigit(digit) { ... }
function inputDecimal() { ... }
function handleOperator(nextOperator) { ... }
function calculate(firstOperand, secondOperand, operator) { ... }
function resetCalculator() { ... }
function updateDisplay() { ... }

// Event binding
function init() { ... }
```

## Complexity Tracking

No violations. Implementation follows all constitution principles with minimal complexity.

## Implementation Phases

### Phase 1: Setup
- Create folder structure
- Create index.html with semantic structure
- Add CSS reset and base variables

### Phase 2: UI Implementation
- Build button grid with CSS Grid
- Style display area
- Apply soft design (colors, shadows, radius)
- Add hover/active states

### Phase 3: Core Logic
- Implement state object
- Implement inputDigit()
- Implement inputDecimal()
- Implement handleOperator()
- Implement calculate() with all 4 operations
- Implement resetCalculator()

### Phase 4: Error Handling
- Add division by zero check
- Add overflow detection
- Implement error display and recovery

### Phase 5: Integration
- Bind event listeners
- Connect buttons to functions
- Implement updateDisplay()
- Test all user stories

## Next Steps

Run `/sp.tasks` to generate the detailed task list with specific file paths and acceptance criteria.
