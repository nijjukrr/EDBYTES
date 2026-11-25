# Milestone 5 — Test Report (`CALCURA — Smart Calculator`)

All tests were executed in real headless Google Chrome (`1440×900` desktop and `1920×1080` down to `360×740` responsive widths) against a local HTTP server serving `milestone-5/`.

## Four Official Mandatory Checklist Items

| # | Mandatory Check | Status | Actual Result |
|---|---|---|---|
| 1 | Read two numeric inputs | **PASS** | Reads `#a` and `#b`, validates raw strings & `badInput`, and converts with `Number()`. |
| 2 | Implement Add, Subtract, Multiply and Divide with explicit functions | **PASS** | Uses explicit `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, and `divide(a, b)` dispatched via `switch`. |
| 3 | Show useful message for blank/non-numeric input and division by zero | **PASS** | Shows clear errors for both blank, first blank, second blank, non-numeric (`abc`), `0`, `-0`, and overflow. |
| 4 | Test all four operations and one invalid example | **PASS** | All five required examples (`20+10`, `20-10`, `20*10`, `20/10`, `20/0`) and 9 extra validation/edge tests passed. |

## Five Required Mentor Submission Test Examples

| Test | Inputs & Operation | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Test 1 | `20`, `10`, Add (`+`) | `30` | `badge: "Addition"`, `expr: "20 + 10 ="`, `val: "30"`, `isSuccess: true` | **PASS** |
| Test 2 | `20`, `10`, Subtract (`-`) | `10` | `badge: "Subtraction"`, `expr: "20 − 10 ="`, `val: "10"`, `isSuccess: true` | **PASS** |
| Test 3 | `20`, `10`, Multiply (`*`) | `200` | `badge: "Multiplication"`, `expr: "20 × 10 ="`, `val: "200"`, `isSuccess: true` | **PASS** |
| Test 4 | `20`, `10`, Divide (`/`) | `2` | `badge: "Division"`, `expr: "20 ÷ 10 ="`, `val: "2"`, `isSuccess: true` | **PASS** |
| Test 5 | `20`, `0`, Divide (`/`) | `"Cannot divide by zero."` (no `Infinity`/`NaN`) | `badge: "Error"`, `val: "Cannot divide by zero."`, `isError: true` | **PASS** |

## Additional Validation & Edge-Case Tests

| Test | Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Test 6 | Both inputs blank (`""`, `""`) | Useful blank message | `val: "Please enter both numbers."`, `isError: true` | **PASS** |
| Test 7 | First input blank (`""`, `"10"`) | First-number validation message | `val: "Please enter the first number."`, `isError: true` | **PASS** |
| Test 8 | Second input blank (`"20"`, `""`) | Second-number validation message | `val: "Please enter the second number."`, `isError: true` | **PASS** |
| Test 9 | Non-numeric input (`"20"`, `"abc"`) | Invalid-number message | `val: "Please enter valid numbers."`, `isError: true` | **PASS** |
| Test 10 | Decimals (`2.5+1.5`, `0.1+0.2`, `9/2`) | `4`, `0.3`, `4.5` | `val: "4"`, `val: "0.3"`, `val: "4.5"` | **PASS** |
| Test 11 | Negatives (`-10+5`, `-10*2`) | `-5`, `-20` | `val: "-5"`, `val: "-20"` | **PASS** |
| Test 12 | Negative zero division (`20 / -0`) | `"Cannot divide by zero."` | `val: "Cannot divide by zero."`, `isError: true` | **PASS** |
| Test 13 | Non-finite overflow (`1e308 * 10`) | Error without displaying `Infinity` | `val: "Result is outside valid finite range."`, `isError: true` | **PASS** |
| Test 14 | Repeated ops + Swap A↔B (`10 - 20`) | Updates accurately to `-10` | `afterSwap: { a: "10", b: "20" }`, `val: "-10"` | **PASS** |
| Test 15 | Browser console & assets | 0 errors, 0 failed requests | `consoleErrors: []`, `pageErrors: []`, `failedRequests: []` | **PASS** |

## Responsive Viewport Matrix
Tested at `1920×1080`, `1440×900`, `1280×720`, `1024×768`, `820×1180`, `768×1024`, `430×932`, `390×844`, `375×812`, and `360×740`:
- All 10 viewports: `overflowX: false`, `inputsFit: true`, `opsFit: true`, `resultFits: true` (**PASS**).
