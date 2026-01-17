# Calculator Project Patterns & Intelligence

## Quick Reference

### File Locations
- **UI Structure**: `calculator-ui/index.html`
- **Styles**: `calculator-ui/styles.css`
- **Logic**: `calculator-ui/script.js`
- **Constitution**: `.specify/memory/constitution.md`

---

## Code Patterns

### Adding a New Button

1. **HTML** (`index.html`):
```html
<button class="btn btn-{type}" data-action="{action}" data-value="{value}">{label}</button>
```

2. **CSS** (`styles.css`) - if new type:
```css
.btn-{type} {
    background-color: var(--color-btn-{type});
    color: var(--color-text-light);
}
```

3. **JS** (`script.js`):
```javascript
// Add case in handleButtonClick()
case '{action}':
    handle{Action}();
    break;

// Add handler function
function handle{Action}() {
    // Implementation
    updateDisplay();
}
```

### Adding Keyboard Support

In `handleKeyboard()`:
```javascript
} else if (key === '{key}') {
    handle{Action}();
}
```

---

## State Transitions

```
[Initial] --input digit--> [Has Number]
[Has Number] --operator--> [Waiting for Second] (operator highlighted)
[Waiting for Second] --input digit--> [Has Second Number] (operator cleared)
[Has Second Number] --equals--> [Result] (shows result)
[Any State] --clear--> [Initial]
[Error] --any input--> [Initial]
```

---

## Error Handling Patterns

### Division by Zero
```javascript
if (second === 0) {
    return 'Error';
}
```

### Overflow
```javascript
if (!isFinite(result)) {
    return 'Error';
}
```

### Setting Error State
```javascript
calculator.displayValue = 'Error';
calculator.hasError = true;
calculator.firstOperand = null;
calculator.operator = null;
calculator.waitingForSecondOperand = false;
clearActiveOperator();
updateDisplay();
```

---

## CSS Variables Quick Reference

### Colors
| Variable | Value | Use |
|----------|-------|-----|
| `--color-bg` | Purple gradient | Page background |
| `--color-calculator-bg` | `#2d2d3a` | Calculator body |
| `--color-display-bg` | `#1c1c28` | Display area |
| `--color-btn-number` | `#3d3d4d` | Number buttons |
| `--color-btn-operator` | `#ff9f0a` | Operator buttons |
| `--color-btn-function` | `#505060` | Function buttons |

### Sizing
| Variable | Value | Use |
|----------|-------|-----|
| `--btn-size` | `65px` | Button dimensions |
| `--btn-gap` | `12px` | Grid gap |
| `--radius-btn` | `50%` | Circular buttons |
| `--font-display` | `3rem` | Display font |
| `--font-btn` | `1.5rem` | Button font |

---

## Testing Checklist

### Core Operations
- [ ] Addition: `5 + 3 = 8`
- [ ] Subtraction: `10 - 4 = 6`
- [ ] Multiplication: `6 × 7 = 42`
- [ ] Division: `15 ÷ 3 = 5`

### Edge Cases
- [ ] Division by zero shows "Error"
- [ ] Very large numbers use scientific notation
- [ ] Decimal numbers work correctly
- [ ] Chained operations: `5 + 3 × 2 = 16` (sequential)

### Functions
- [ ] Clear resets to "0"
- [ ] Toggle sign: `5` → `-5` → `5`
- [ ] Percent: `50%` → `0.5`

### Keyboard
- [ ] Numbers 0-9 input correctly
- [ ] Operators +, -, *, / work
- [ ] Enter/= triggers equals
- [ ] Escape/C clears
- [ ] % triggers percent

---

## Common Modifications

### Change Button Color
1. Update CSS variable in `:root`
2. Or override specific class

### Add New Operation
1. Add button in HTML
2. Add handler in JS `handleButtonClick()`
3. Add calculation in `calculate()` if needed
4. Add keyboard shortcut if applicable

### Modify Display Format
Update `formatResult()` function

### Change Layout
Modify grid in `.buttons` CSS class

---

## Performance Notes

- Event delegation used (single listener on container)
- No external dependencies
- Minimal DOM updates (only display element)
- State managed in single object (easy to debug)

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid required
- CSS Custom Properties required
- ES6+ JavaScript features used
