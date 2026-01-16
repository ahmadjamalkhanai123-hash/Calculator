# Tasks: Basic UI Calculator

**Input**: Design documents from `/specs/1-calculator-ui/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source files**: `calculator-ui/` at repository root
- Files: `index.html`, `styles.css`, `script.js`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create `calculator-ui/` directory at repository root
- [x] T002 [P] Create `calculator-ui/index.html` with HTML5 boilerplate and semantic structure
- [x] T003 [P] Create `calculator-ui/styles.css` with CSS reset and custom properties (design tokens)
- [x] T004 [P] Create `calculator-ui/script.js` with calculator state object skeleton

**Checkpoint**: Project structure ready, files created with basic scaffolding - COMPLETE

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core UI structure that ALL user stories depend on

- [x] T005 Add calculator container and display element to `calculator-ui/index.html`
- [x] T006 Add button grid structure (4x5 grid) to `calculator-ui/index.html`
- [x] T007 [P] Style calculator container with soft design in `calculator-ui/styles.css`
  - Background: `#f5f5f5`
  - Border radius: 16px
  - Box shadow: `0 4px 6px rgba(0,0,0,0.1)`
- [x] T008 [P] Style display area in `calculator-ui/styles.css`
  - Background: `#ffffff`
  - Text align: right
  - Font size: 2.5rem
  - Padding and overflow handling
- [x] T009 Style button grid with CSS Grid in `calculator-ui/styles.css`
  - 4 columns layout
  - Gap between buttons
  - Button base styles (radius: 12px)
- [x] T010 [P] Style number buttons in `calculator-ui/styles.css`
  - Background: `#e8e8e8`
  - Hover and active states
- [x] T011 [P] Style operator buttons in `calculator-ui/styles.css`
  - Background: `#ff9500`
  - White text
  - Hover and active states
- [x] T012 [P] Style clear button in `calculator-ui/styles.css`
  - Background: `#ff3b30`
  - White text
- [x] T013 [P] Style equals button in `calculator-ui/styles.css`
  - Background: `#ff9500`
  - White text
- [x] T014 Make zero button span two columns in `calculator-ui/styles.css`
- [x] T015 Implement `updateDisplay()` function in `calculator-ui/script.js`
- [x] T016 Implement `init()` function to bind event listeners in `calculator-ui/script.js`

**Checkpoint**: Calculator UI visible and styled, display updates work - COMPLETE

---

## Phase 3: User Story 1 - Basic Arithmetic (Priority: P1)

**Goal**: User can perform add, subtract, multiply, divide operations

**Independent Test**: `5 + 3 = 8`, `10 - 4 = 6`, `6 * 7 = 42`, `20 / 4 = 5`

### Implementation for User Story 1

- [x] T017 [US1] Implement `inputDigit(digit)` function in `calculator-ui/script.js`
  - Handle digit 0-9 input
  - Append to displayValue or replace if starting new number
  - Update display after each digit
- [x] T018 [US1] Implement `inputDecimal()` function in `calculator-ui/script.js`
  - Prevent multiple decimal points
  - Add "0." if starting with decimal
- [x] T019 [US1] Implement `handleOperator(operator)` function in `calculator-ui/script.js`
  - Store firstOperand from display
  - Store operator
  - Set waitingForSecondOperand flag
- [x] T020 [US1] Implement `calculate(first, second, operator)` function in `calculator-ui/script.js`
  - Addition: `first + second`
  - Subtraction: `first - second`
  - Multiplication: `first * second`
  - Division: `first / second`
- [x] T021 [US1] Connect number buttons (0-9) to `inputDigit()` in `calculator-ui/script.js`
- [x] T022 [US1] Connect decimal button to `inputDecimal()` in `calculator-ui/script.js`
- [x] T023 [US1] Connect operator buttons (+, -, *, /) to `handleOperator()` in `calculator-ui/script.js`
- [x] T024 [US1] Connect equals button to trigger calculation in `calculator-ui/script.js`

**Checkpoint**: All four arithmetic operations work: `5+3=8`, `10-4=6`, `6*7=42`, `20/4=5` - COMPLETE

---

## Phase 4: User Story 2 - Division by Zero (Priority: P1)

**Goal**: Display "Cannot divide by zero" when dividing by zero

**Independent Test**: `10 / 0` shows error, then entering a number clears error

### Implementation for User Story 2

- [x] T025 [US2] Add division by zero check in `calculate()` function in `calculator-ui/script.js`
  - If operator is "/" and second operand is 0
  - Return error string "Cannot divide by zero"
- [x] T026 [US2] Update `updateDisplay()` to handle error messages in `calculator-ui/script.js`
  - Display error text
  - Set error flag in state
- [x] T027 [US2] Update `inputDigit()` to clear error state in `calculator-ui/script.js`
  - If error is displayed, reset state and show new digit

**Checkpoint**: `10 / 0` shows "Cannot divide by zero", pressing any digit clears error - COMPLETE

---

## Phase 5: User Story 3 - Invalid Input Handling (Priority: P2)

**Goal**: Prevent invalid inputs, handle edge cases gracefully

**Independent Test**: Only calculator buttons work, keyboard letters ignored

### Implementation for User Story 3

- [x] T028 [US3] Validate digit input in `inputDigit()` in `calculator-ui/script.js`
  - Only accept "0"-"9"
  - Ignore any other input
- [x] T029 [US3] Handle equals without second operand in `calculator-ui/script.js`
  - If no secondOperand, use firstOperand or current display
  - Prevent NaN results
- [x] T030 [US3] Add maximum digit limit (12 digits) in `inputDigit()` in `calculator-ui/script.js`
  - Prevent display overflow

**Checkpoint**: Calculator handles edge cases without crashing - COMPLETE

---

## Phase 6: User Story 4 - Clear and Reset (Priority: P2)

**Goal**: C button resets calculator to initial state

**Independent Test**: After any operation, C returns display to "0"

### Implementation for User Story 4

- [x] T031 [US4] Implement `resetCalculator()` function in `calculator-ui/script.js`
  - displayValue = "0"
  - firstOperand = null
  - operator = null
  - waitingForSecondOperand = false
- [x] T032 [US4] Connect C button to `resetCalculator()` in `calculator-ui/script.js`
- [x] T033 [US4] Call `updateDisplay()` after reset in `calculator-ui/script.js`

**Checkpoint**: C button resets calculator at any point - COMPLETE

---

## Phase 7: User Story 5 - Chained Calculations (Priority: P2)

**Goal**: Pressing operator evaluates pending calculation

**Independent Test**: `5 + 3 +` shows `8`, then `2 =` shows `10`

### Implementation for User Story 5

- [x] T034 [US5] Update `handleOperator()` to evaluate pending operation in `calculator-ui/script.js`
  - If firstOperand exists and not waiting
  - Calculate result first
  - Store result as new firstOperand
  - Store new operator
- [x] T035 [US5] Handle negative results display in `calculator-ui/script.js`
  - `3 - 8 = -5` should display "-5"
  - Ensure negative sign is visible

**Checkpoint**: `5 + 3 + 2 =` shows `10`, `3 - 8 =` shows `-5` - COMPLETE

---

## Phase 8: Polish & Final Testing

**Purpose**: Final touches and validation

- [x] T036 [P] Add keyboard support (optional) in `calculator-ui/script.js`
  - 0-9 for digits
  - +, -, *, / for operators
  - Enter for equals
  - Escape for clear
- [x] T037 [P] Add button press visual feedback (active state) in `calculator-ui/styles.css`
- [x] T038 Test all acceptance scenarios from spec.md
  - [x] US1: All 4 arithmetic operations
  - [x] US2: Division by zero error and recovery
  - [x] US3: Invalid input handling
  - [x] US4: Clear button
  - [x] US5: Chained calculations
- [x] T039 Validate against quickstart.md testing checklist
- [x] T040 Verify soft design matches plan.md specifications

**Checkpoint**: All user stories pass, calculator fully functional - COMPLETE

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Phase 2 completion
  - US1 (Phase 3): Required first - core functionality
  - US2 (Phase 4): Can start after Phase 3
  - US3-5 (Phase 5-7): Can run in parallel after Phase 3
- **Polish (Phase 8)**: Depends on all user story phases

### Task Dependencies Within Phases

```
Phase 1: T001 → T002, T003, T004 (parallel after T001)
Phase 2: T005 → T006 → T007-T014 (styling parallel) → T015 → T016
Phase 3: T017 → T018 → T019 → T020 → T021-T024 (binding parallel)
Phase 4: T025 → T026 → T027
Phase 5: T028, T029, T030 (all parallel)
Phase 6: T031 → T032 → T033
Phase 7: T034 → T035
Phase 8: T036, T037 (parallel) → T038 → T039 → T040
```

### Parallel Opportunities

- T002, T003, T004 can run in parallel (different files)
- T007-T014 styling tasks can run in parallel
- T021-T024 button binding can run in parallel
- T028-T030 validation can run in parallel
- T036, T037 polish tasks can run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational UI
3. Complete Phase 3: User Story 1 (Basic Arithmetic)
4. Complete Phase 4: User Story 2 (Division by Zero)
5. **STOP and VALIDATE**: Calculator does basic math with error handling

### Full Feature

6. Complete Phase 5: User Story 3 (Invalid Input)
7. Complete Phase 6: User Story 4 (Clear)
8. Complete Phase 7: User Story 5 (Chaining)
9. Complete Phase 8: Polish and Testing

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All file paths are relative to repository root
- Test after each checkpoint before proceeding
- Commit after each phase or logical group
