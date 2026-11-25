# QUIZLY — Interactive Knowledge Quiz (EdBytes Milestone 4)

## Project Title
**QUIZLY — Interactive Knowledge Quiz**

## EdBytes Milestone Name
**EdBytes Full Stack Development Internship — Milestone 4 (Task FSD-03: A Three-Question Quiz)**

## Project Description
QUIZLY is a clean, responsive, beginner-friendly three-question quiz web application built with HTML5, CSS3, and Vanilla JavaScript. It preserves the exact three-question `questions` array and state model (`index`, `score`, `answered`) from the official EdBytes `task-fsd-03-beginner-20261028` starter pack while presenting a structured start screen, progress indicator, dynamic answer button generation, duplicate-submission prevention, immediate feedback, final score summary out of 3, and quiz restart.

An untouched copy of the original starter pack is preserved inside `milestone-4/starter-backup/`.

## Technologies
- **HTML5** (semantic sections, accessible button roles, `role="progressbar"`, `role="status"` live region)
- **CSS3** (custom properties, CSS Grid, Flexbox, responsive media queries, `prefers-reduced-motion`, `:focus-visible`)
- **Vanilla JavaScript** (strict mode, dynamic DOM rendering with `textContent`, state guards)

## Features
- **Start Screen:** Introduces QUIZLY, shows the question count (`3`) and scoring (`1 pt / question`), and initializes clean session state on click.
- **Single-Question Focus:** Displays one question at a time (`1 of 3`, `2 of 3`, `3 of 3`) with a live progress bar clamped to `100%`.
- **Dynamic Choice Generation & Safe Text:** Generates answer buttons with `textContent` directly from `questions[index].choices`.
- **Single-Count Validation & Feedback:** Guards against double-clicking (`if (answered) return;`), locks all choices after selection, highlights the true correct answer in green (and any wrong selection in red), and reveals contextual feedback (`"Correct! Well done."` or `"Incorrect. The correct answer is CSS."`).
- **Guarded Advancement & Final Score:** Keeps `Next Question` hidden/disabled until answered, prevents out-of-bounds access after Question 3, displays `X / 3` with breakdown (`Correct Answers`, `Incorrect Answers`), and supports full `Restart Quiz`.

## How the Quiz Works
1. State starts at `index = 0`, `score = 0`, `answered = false`.
2. Clicking **Start Quiz** triggers `startQuiz()` -> `render()`, displaying `questions[index]` and dynamically creating one button per choice.
3. Clicking a choice invokes `handleAnswer(selectedIndex)`: if `answered` is already `true`, it returns immediately; otherwise it sets `answered = true`, increments `score` if `selectedIndex === questions[index].answer`, disables all choice buttons, shows feedback, and reveals `Next Question`.
4. Clicking `Next Question` invokes `nextQuestion()`, advancing `index` only when `answered === true`, and calling `showFinalScore()` once `index >= questions.length`.

## How to Run Locally
No frameworks, packages, or build steps are required.
1. Open `milestone-4/index.html` directly in your browser, or start a local static server from the repository root:
   ```bash
   python -m http.server 8080
   ```
2. Visit `http://localhost:8080/milestone-4/`.

## Live URL
https://nijjukrr.github.io/EDBYTES/milestone-4/

## Known Limitations
- Quiz state lives in memory for the active browser session; refreshing the page returns cleanly to the start screen.
- Contains the three official starter-pack questions as required by EdBytes Task FSD-03 (`beginner-20261028`).

## Screenshots
- [Quiz Start Screen](evidence/quiz-start.png)
- [Question Answered (Incorrect Selection Highlighting Correct Answer)](evidence/question-answered.png)
- [Correct-Answer Run Result (3 / 3)](evidence/correct-run-result.png)
- [Mixed-Answer Run Result (2 / 3)](evidence/mixed-run-result.png)
- [Mobile Quiz View (375px)](evidence/mobile-quiz.png)
