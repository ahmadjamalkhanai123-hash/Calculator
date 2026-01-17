---
description: Reusable intelligence for the Calculator project - provides context, patterns, and guidance for development.
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

## Calculator Project Intelligence

This skill provides reusable intelligence about the Calculator project for development, maintenance, and feature additions.

### Project Overview

**Name**: Basic UI Calculator
**Type**: Web-based calculator application
**Tech Stack**: HTML5, CSS3, Vanilla JavaScript (no frameworks)
**Design**: Modern soft design with dark theme

### Architecture

```
Calculator/
├── calculator-ui/           # Main application
│   ├── index.html          # UI structure and button layout
│   ├── styles.css          # Soft design styling with CSS variables
│   └── script.js           # Calculator logic and state management
├── .claude/commands/        # Claude Code skills
├── .specify/               # SDD templates and scripts
│   ├── memory/             # Project constitution
│   └── templates/          # Document templates
└── specs/                  # Feature specifications
```

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

- **Left 3 columns**: Numbers and functions
- **Right column**: Operations (÷, ×, −, +, =)
- **Zero button**: Spans 2 columns (pill shape)

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

The calculator uses a single state object:

```javascript
const calculator = {
    displayValue: '0',           // Current display value
    firstOperand: null,          // First number in operation
    operator: null,              // Current operator (+, -, *, /)
    waitingForSecondOperand: false,  // Awaiting second number
    hasError: false              // Error state flag
};
```

### CSS Design Tokens

Key CSS variables for consistent styling:

```css
--color-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--color-calculator-bg: #2d2d3a;
--color-btn-number: #3d3d4d;
--color-btn-operator: #ff9f0a;
--color-btn-function: #505060;
--radius-btn: 50%;              /* Circular buttons */
--btn-size: 65px;
```

### Button Classes

| Class | Purpose | Color |
|-------|---------|-------|
| `.btn-number` | Digit buttons (0-9, .) | Dark gray (#3d3d4d) |
| `.btn-operator` | Operations (÷×−+=) | Orange (#ff9f0a) |
| `.btn-function` | Functions (±, %) | Medium gray (#505060) |
| `.btn-clear` | Clear button (C) | Medium gray (#505060) |
| `.btn-equals` | Equals button | Orange (#ff9f0a) |

### Event Handling

- **Click events**: Event delegation on `.buttons` container
- **Keyboard support**: Global keydown listener
- **Data attributes**: `data-action` and `data-value` on buttons

### Development Patterns

1. **Input Validation**: All inputs validated before processing
2. **Error Handling**: Graceful handling of division by zero, overflow
3. **State-based UI**: Display updates based on calculator state
4. **Active Operator Highlighting**: Visual feedback for selected operator

### Constitution Principles

From `.specify/memory/constitution.md`:

1. **Input Validation First**: Validate all inputs at boundaries
2. **Error Handling**: Never crash, always show clear error messages
3. **Simplicity**: YAGNI - no over-engineering
4. **Testability**: All core functions independently testable

---

## How to Use This Skill

When invoked with `/calc-project`, this skill:

1. **Provides context** about the calculator architecture and patterns
2. **Guides development** with established conventions
3. **References key files** and their purposes
4. **Supports handoffs** to other development skills

### Common Use Cases

**Adding a new feature:**
```
/calc-project I want to add memory functions (M+, M-, MR, MC)
```

**Understanding the codebase:**
```
/calc-project Explain the state management approach
```

**Fixing a bug:**
```
/calc-project The percentage function isn't working correctly
```

**Refactoring:**
```
/calc-project How should I refactor the operator handling?
```

---

## Execution Flow

When this skill is invoked:

1. **Parse user input** from $ARGUMENTS
2. **Load project context**:
   - Read `calculator-ui/script.js` for current implementation
   - Read `calculator-ui/styles.css` for styling patterns
   - Read `calculator-ui/index.html` for UI structure
   - Read `.specify/memory/constitution.md` for principles
3. **Analyze request** against project patterns
4. **Provide guidance** based on established architecture
5. **Suggest handoffs** to appropriate skills if action is needed

## Key Files Reference

| File | Purpose | When to Modify |
|------|---------|----------------|
| `calculator-ui/index.html` | Button layout, structure | Adding/removing buttons |
| `calculator-ui/styles.css` | Visual design, colors | Styling changes |
| `calculator-ui/script.js` | Calculator logic | Adding features, fixing bugs |
| `.specify/memory/constitution.md` | Project principles | Rarely - governance changes |

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
