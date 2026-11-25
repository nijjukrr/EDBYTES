# Milestone 4 — Test Report (`QUIZLY — Interactive Knowledge Quiz`)

All tests were executed in real headless Google Chrome (`1440×900` desktop and `1920×1080` down to `360×740` responsive widths) against a local HTTP server serving `milestone-4/`.

## Four Official Mandatory Checks

| # | Mandatory Check | Status | Actual Result |
|---|---|---|---|
| 1 | Read the provided question array | **PASS** | Exact 3-question starter array loaded (`metaCount: "3"`, Q1 `'Which tag is a heading?'`, Q2 `'Which language styles a page?'`, Q3 `'How many days in a week?'`). |
| 2 | Show one question and its answer buttons | **PASS** | Displays one question at a time (`"Question 1 of 3"`) with 3 dynamically generated buttons (`h1`, `p`, `div`). |
| 3 | Count each question only once and show correct/incorrect text | **PASS** | `answered` guard + button disabling prevented extra clicks on Q1 from changing state; feedback shows `"Correct! Well done."` or `"Incorrect. The correct answer is CSS."`. |
| 4 | Show the score out of three after the final answer | **PASS** | Final result card renders `"3 / 3"` on the correct-answer run and `"2 / 3"` on the mixed-answer run. |

## Detailed Test Cases

| Test | Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Test 1 | Question array verification | 3 valid questions, valid choices & answer indexes | `title: "QUIZLY — Interactive Knowledge Quiz"`, `metaCount: "3"`, `startVisible: true`, `quizHidden: true`, `resultHidden: true` | **PASS** |
| Test 2 | Show question and answer buttons | Q1 visible, 3 choices, `1 of 3`, Next & feedback hidden | `questionText: "Which tag is a heading?"`, `choiceTexts: ["h1", "p", "div"]`, `progressLabel: "Question 1 of 3"`, `nextHiddenBeforeAnswer: true`, `feedbackHiddenBeforeAnswer: true` | **PASS** |
| Test 3 | Correct-answer run (`h1`, `CSS`, `7`) | All marked correct, score = `3 / 3` | `resultVisible: true`, `score: "3 / 3"`, `correct: "3"`, `wrong: "0"`, `message: "Excellent! Perfect score."` | **PASS** |
| Test 4 | Mixed-answer run (`h1`, `SQL`, `7`) | Q1 correct, Q2 wrong (`CSS` highlighted), Q3 correct, score = `2 / 3` | Q2 feedback `"Incorrect. The correct answer is CSS."` (`isWrongFeedback: true`, `correctHighlighted: true`, `wrongHighlighted: true`); final `score: "2 / 3"`, `correct: "2"`, `wrong: "1"`, `"Great work! You are almost there."` | **PASS** |
| Test 5 | Prevent double counting | Clicking additional choices after first answer has no effect | `buttonsDisabled: true`, `nextVisibleAfterAnswer: true`, score counted once | **PASS** |
| Test 6 | Next button boundary | Clicking Next before answering does not advance | `stillOnQ1BeforeAnswer: true` (`"Question 1 of 3"`); advances cleanly after selection | **PASS** |
| Test 7 | Final question boundary | Advancing after Q3 displays result, no Q4 or undefined error | `quizHidden: true`, `resultDisplayed: true`, `noUndefinedError: true` | **PASS** |
| Test 8 | Restart quiz | Resets to Q1 (`1 of 3`), clears feedback, enables buttons, score = 0 | `quizVisible: true`, `resultHidden: true`, `questionText: "Which tag is a heading?"`, `progressLabel: "Question 1 of 3"`, `feedbackHidden: true`, `buttonsEnabled: true` | **PASS** |
| Test 9 | Responsive matrix (`1920`, `1440`, `1280`, `1024`, `820`, `768`, `430`, `390`, `375`, `360`) | 0 horizontal overflow, card/buttons/progress bar fit cleanly | All 10 viewports: `overflowX: false`, `cardFits: true`, `buttonsFit: true`, `progressFits: true` | **PASS** |
| Test 10 | Browser console & assets | 0 console errors, 0 uncaught exceptions, 0 failed assets | `consoleErrors: []`, `pageErrors: []`, `failedRequests: []` | **PASS** |
