# Quickstart: Basic UI Calculator

**Feature**: 1-calculator-ui
**Date**: 2026-01-16

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor (VS Code, Notepad++, or any editor)
- No additional software or dependencies required

---

## Getting Started

### Step 1: Create Project Files

Create a new folder called `calculator-ui` and add these three files:

```
calculator-ui/
├── index.html
├── styles.css
└── script.js
```

### Step 2: Open in Browser

Simply open `index.html` in your web browser:

- **Windows**: Double-click `index.html`, or right-click → Open with → Chrome/Firefox
- **Mac**: Double-click `index.html`, or right-click → Open With → Safari/Chrome
- **Alternative**: Drag and drop `index.html` into a browser window

No server required - it runs directly from the file system.

---

## Using the Calculator

### Basic Operations

1. Click number buttons (0-9) to enter a number
2. Click an operator (+, -, *, /)
3. Enter the second number
4. Click = to see the result

**Example**: To calculate 5 + 3:
- Click: `5` → `+` → `3` → `=`
- Display shows: `8`

### Chained Calculations

You can chain operations without pressing = each time:

**Example**: To calculate 5 + 3 + 2:
- Click: `5` → `+` → `3` → `+` (shows 8) → `2` → `=`
- Display shows: `10`

### Decimal Numbers

Click the `.` button to add a decimal point:

**Example**: To calculate 3.14 * 2:
- Click: `3` → `.` → `1` → `4` → `*` → `2` → `=`
- Display shows: `6.28`

### Clearing

Click `C` at any time to reset the calculator to 0.

---

## Error Handling

### Division by Zero

If you try to divide by zero:
- Display shows: "Cannot divide by zero"
- Click any number to start a new calculation

### Large Numbers

If the result is too large:
- Display shows: "Overflow"
- Click any number to start a new calculation

---

## Testing Checklist

After implementation, verify these scenarios work:

- [ ] `5 + 3 = 8` (addition)
- [ ] `10 - 4 = 6` (subtraction)
- [ ] `6 * 7 = 42` (multiplication)
- [ ] `20 / 4 = 5` (division)
- [ ] `10 / 0` shows "Cannot divide by zero"
- [ ] `3 - 8 = -5` (negative result)
- [ ] `5 + 3 + 2 = 10` (chained operations)
- [ ] `3.14 * 2 = 6.28` (decimals)
- [ ] `C` button resets to 0
- [ ] Clicking numbers after error clears the error

---

## Development Tips

### Live Reload (Optional)

For faster development, you can use a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (with npx)
npx serve
```

Then open `http://localhost:8000` in your browser.

### Debugging

- Open browser DevTools (F12 or Cmd+Option+I)
- Use Console tab to see errors
- Use Elements tab to inspect the calculator structure
- Use `Calculator.getState()` in console to see current state

---

## File Structure Reference

```
calculator-ui/
├── index.html    # HTML structure (buttons, display)
├── styles.css    # Visual styling (soft design)
└── script.js     # Calculator logic (state, operations)
```

No build process. No npm. No bundlers. Just open and run.
