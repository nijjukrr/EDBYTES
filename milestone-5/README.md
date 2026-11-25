# CALCURA — Smart Calculator (EdBytes Milestone 5)

## Project Title
**CALCURA — Smart Calculator**

## EdBytes Milestone and Task ID
- **Milestone:** EdBytes Full Stack Development Internship — Milestone 5
- **Task ID:** Task FSD-04 (`beginner-20261028`): *Four-Operation Calculator*

## Project Description
CALCURA is a clean, responsive four-operation web calculator built with HTML5, CSS3, and Vanilla JavaScript. It builds on the official EdBytes `task-fsd-04-beginner-20261028` starter (`a`, `b`, `operations`, `result`, and event delegation) while implementing explicit arithmetic functions, a `switch` dispatcher, thorough numeric input validation, division-by-zero rejection, floating-point display cleanup, Swap/Clear utilities, and a local session calculation log.

An untouched backup of the official starter pack is preserved inside `milestone-5/starter-backup/`.

## Technologies Used
- **HTML5** (semantic landmarks, `<input type="number" step="any">`, `role="status"` live region)
- **CSS3** (custom properties, CSS Grid & Flexbox, responsive media queries, `prefers-reduced-motion`, `:focus-visible`)
- **Vanilla JavaScript** (strict mode, explicit arithmetic functions, `switch` statement, `Number()` & `Number.isFinite()`, safe `textContent` rendering, zero `eval()`)

## Features
- **Four Explicit Operations:** Add (`+`), Subtract (`-`), Multiply (`*`), and Divide (`/`) dispatched via event delegation and `switch`.
- **Comprehensive Input Validation:** Rejects blank first/second/both inputs without coercing blanks to zero, catches browser `badInput` and non-finite inputs, and rejects both `0` and `-0` divisors.
- **Decimals & Negatives:** Supports decimal (`2.5 + 1.5 = 4`, `0.1 + 0.2 = 0.3`) and negative (`-10 + 5 = -5`) inputs cleanly.
- **Clear Result States & Utilities:** Separates `Ready`, `Success`, and `Error` states visually and textually, plus **Swap A ↔ B**, **Clear**, and a local **Recent Calculations** list.

## Four Arithmetic Functions
```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }
  return a / b;
}
```

## Input Validation Approach
1. Checks `validity.badInput` on `#a` and `#b` so malformed browser entries report `"Please enter valid numbers."`.
2. Checks trimmed input strings before `Number()` conversion so blank inputs never coerce to `0`: reports `"Please enter both numbers."`, `"Please enter the first number."`, or `"Please enter the second number."`.
3. Validates converted values and computed results with `Number.isFinite(...)` to block `NaN` and `Infinity`.
4. Rejects division by `0` or `-0` inside `divide(a, b)`.

## How to Run Locally
No frameworks or build steps are required.
1. Open `milestone-5/index.html` directly in your browser, or run a static server from the repository root:
   ```bash
   python -m http.server 8080
   ```
2. Visit `http://localhost:8080/milestone-5/`.

## Live Deployment URL
https://nijjukrr.github.io/EDBYTES/milestone-5/

## Known Limitations
- Recent calculation history lives in memory only for the active session and clears on page refresh.
- Extreme exponential inputs exceeding IEEE-754 double range (`> 1.797e308`) are rejected as non-finite rather than using arbitrary-precision big-decimal math.

## Screenshots
- [Default View](evidence/calculator-default.png)
- [Addition (20 + 10 = 30)](evidence/addition-result.png)
- [Subtraction (20 - 10 = 10)](evidence/subtraction-result.png)
- [Multiplication (20 × 10 = 200)](evidence/multiplication-result.png)
- [Division (20 ÷ 10 = 2)](evidence/division-result.png)
- [Division by Zero Error (20 ÷ 0)](evidence/validation-error.png)
- [Mobile View (375px)](evidence/mobile-calculator.png)
