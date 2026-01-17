# Calculator Project - Quick Start Guide

## Getting Started

### Running the Calculator
1. Open `calculator-ui/index.html` in a web browser
2. No build process or server required
3. Works offline

### Project Structure
```
Calculator/
├── calculator-ui/          # The application
│   ├── index.html         # Open this to run
│   ├── styles.css         # All styling
│   └── script.js          # All logic
├── .claude/commands/       # AI skills (including /calc-project)
└── .specify/              # Project documentation
    ├── memory/            # Constitution (principles)
    └── intelligence/      # This documentation
```

---

## Making Changes

### Quick Edits

| Change | File | Location |
|--------|------|----------|
| Button text | `index.html` | Button element |
| Button color | `styles.css` | CSS variable or class |
| Calculation logic | `script.js` | `calculate()` function |
| Display format | `script.js` | `formatResult()` function |
| Keyboard shortcut | `script.js` | `handleKeyboard()` function |

### Adding a Feature

1. **Plan**: Use `/calc-project` skill for guidance
2. **Spec**: Use `/sp.specify` to document requirements
3. **Implement**: Follow patterns in `calculator-patterns.md`
4. **Test**: Use testing checklist
5. **Commit**: Use `/sp.git.commit_pr` for clean commits

---

## Key Concepts

### State Object
All calculator state lives in one object:
```javascript
calculator.displayValue        // What's shown
calculator.firstOperand        // First number
calculator.operator            // +, -, *, /
calculator.waitingForSecondOperand  // Awaiting input
calculator.hasError            // Error state
```

### Event Flow
```
User clicks button
  → handleButtonClick() identifies action
    → Specific handler (inputDigit, handleOperator, etc.)
      → Update state
        → updateDisplay()
```

### CSS Theming
All colors are CSS variables - change once, applies everywhere:
```css
:root {
    --color-btn-operator: #ff9f0a;  /* Change this */
}
```

---

## Common Tasks

### Change the accent color
Edit `--color-btn-operator` in `styles.css`

### Add a new math function
1. Add button in `index.html`
2. Add handler function in `script.js`
3. Add case in `handleButtonClick()`

### Fix a calculation bug
Debug in `calculate()` function

### Modify number formatting
Update `formatResult()` function

---

## Skills Available

| Skill | Purpose |
|-------|---------|
| `/calc-project` | Project intelligence and guidance |
| `/sp.specify` | Create feature specifications |
| `/sp.plan` | Plan implementation |
| `/sp.tasks` | Generate task breakdown |
| `/sp.git.commit_pr` | Commit and create PR |

---

## Need Help?

1. Run `/calc-project` with your question
2. Check `calculator-patterns.md` for code examples
3. Review constitution in `.specify/memory/constitution.md`
