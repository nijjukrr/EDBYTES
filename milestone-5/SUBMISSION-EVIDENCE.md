# Milestone 5 — Submission Evidence (`CALCURA — Smart Calculator`)

- **Project Name:** CALCURA — Smart Calculator (`EdBytes Task FSD-04`)
- **Live Application URL:** https://nijjukrr.github.io/EDBYTES/milestone-5/
- **GitHub Source Folder URL:** https://github.com/nijjukrr/EDBYTES/tree/main/milestone-5
- **Starter Backup:** Original `task-fsd-04-beginner-20261028.zip` preserved untouched in `milestone-5/starter-backup/`

## Five Required Test Examples
1. **Addition (`20 + 10`):** **`30`** ([evidence/addition-result.png](evidence/addition-result.png))
2. **Subtraction (`20 − 10`):** **`10`** ([evidence/subtraction-result.png](evidence/subtraction-result.png))
3. **Multiplication (`20 × 10`):** **`200`** ([evidence/multiplication-result.png](evidence/multiplication-result.png))
4. **Division (`20 ÷ 10`):** **`2`** ([evidence/division-result.png](evidence/division-result.png))
5. **Invalid Example (`20 ÷ 0`):** **`Cannot divide by zero.`** — `Infinity`/`NaN` prevented ([evidence/validation-error.png](evidence/validation-error.png))

## Four Mandatory Checklist Results
1. **Read two numeric inputs:** **PASS**
2. **Implement Add, Subtract, Multiply and Divide with explicit functions:** **PASS**
3. **Show a useful message for blank/non-numeric input and division by zero:** **PASS**
4. **Test all four operations and one invalid example:** **PASS**

## Implementation Decision
Validated raw input strings and `validity.badInput` before calling `Number()`, rather than calling `Number(el.value)` directly. Because `Number("")` evaluates to `0` in JavaScript, checking raw strings first ensures blank inputs produce explicit guidance (`"Please enter both numbers."` / `"Please enter the first number."` / `"Please enter the second number."`) instead of silently treating missing inputs as zero.

## Learning Observation
*(Suggested draft — please review and personalize in your own words before final mentor submission.)*

Implementing the calculator taught me why checking raw input strings and `Number.isFinite()` before performing arithmetic matters: in JavaScript, `Number("")` becomes `0`, `20 / 0` yields `Infinity`, and `0.1 + 0.2` introduces floating-point rounding artifacts. Handling those edge cases explicitly kept both valid calculations and error messages accurate.
