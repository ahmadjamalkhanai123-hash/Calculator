# Research: Basic UI Calculator

**Feature**: 1-calculator-ui
**Date**: 2026-01-16

## Technology Decisions

### Decision 1: Frontend Technology Stack

**Decision**: Vanilla HTML, CSS, and JavaScript (no frameworks)

**Rationale**:
- Constitution Principle III (Simplicity) mandates minimum viable implementation
- A basic calculator does not need React, Vue, or other frameworks
- No build tools required - just open the HTML file in a browser
- Easier to understand, maintain, and debug
- Zero external dependencies as per Technical Standards

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|--------------|
| React | Over-engineering for 4 arithmetic operations |
| Vue | Adds complexity without benefit |
| jQuery | Unnecessary abstraction layer |

---

### Decision 2: CSS Approach

**Decision**: Single CSS file with simple, soft design using CSS custom properties

**Rationale**:
- User requested "simple and soft design"
- CSS custom properties (variables) allow easy theming
- Soft shadows and rounded corners create modern, approachable feel
- No CSS preprocessors needed (Sass, Less) - keeps it simple

**Design Tokens**:
```css
--color-bg: #f0f0f0;         /* Soft gray background */
--color-display: #ffffff;     /* White display */
--color-btn: #e0e0e0;         /* Light gray buttons */
--color-btn-operator: #ff9500; /* Orange for operators */
--color-text: #333333;        /* Dark text */
--shadow-soft: 0 4px 6px rgba(0,0,0,0.1);
--radius: 12px;
```

---

### Decision 3: Calculator State Management

**Decision**: Simple JavaScript object to track calculator state

**Rationale**:
- No need for complex state management (Redux, MobX)
- Single state object with: `displayValue`, `firstOperand`, `operator`, `waitingForSecondOperand`
- Direct DOM manipulation for display updates
- Follows Constitution Principle III (Simplicity)

**State Shape**:
```javascript
{
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false
}
```

---

### Decision 4: Button Layout

**Decision**: Standard calculator grid layout (4 columns)

**Rationale**:
- Familiar to all users (matches physical calculators)
- Supports SC-006: 95% first-time user success
- CSS Grid for responsive layout

**Layout**:
```
| C  |    |    |  /  |
| 7  | 8  | 9  |  *  |
| 4  | 5  | 6  |  -  |
| 1  | 2  | 3  |  +  |
| 0       | .  |  =  |
```

---

### Decision 5: Error Handling Strategy

**Decision**: Display error messages in the calculator display, clear on next input

**Rationale**:
- Constitution Principle II (Error Handling) requires graceful handling
- User-friendly messages (not technical errors)
- Error clears when user starts new input (per US2 acceptance scenario)

**Error Messages**:
| Condition | Message |
|-----------|---------|
| Division by zero | "Cannot divide by zero" |
| Overflow | "Overflow" |
| Invalid state | Display resets to "0" |

---

### Decision 6: Decimal Handling

**Decision**: Allow one decimal point per number, standard floating-point arithmetic

**Rationale**:
- FR-008 requires decimal support
- Prevent multiple decimal points in single number
- Use JavaScript's native number handling
- Display precision: truncate to reasonable length (12 digits)

---

## Browser Compatibility

**Target Browsers**: Chrome, Firefox, Safari, Edge (modern versions)

**Required Features**:
- CSS Grid (supported in all modern browsers)
- CSS Custom Properties (supported in all modern browsers)
- ES6 JavaScript (supported in all modern browsers)

No polyfills required.

---

## File Structure Decision

**Decision**: Single-page application with 3 files

```
calculator-ui/
├── index.html    # Structure and entry point
├── styles.css    # All styling
└── script.js     # All logic
```

**Rationale**:
- Constitution Principle III (Simplicity)
- No build process needed
- Easy to open and test locally
- Easy to deploy (just copy 3 files)
