# Milestone 4 — Submission Evidence (`QUIZLY — Interactive Knowledge Quiz`)

- **Project Name:** QUIZLY — Interactive Knowledge Quiz (`EdBytes Task FSD-03`)
- **Live Application URL:** https://nijjukrr.github.io/EDBYTES/milestone-4/
- **GitHub Source Folder URL:** https://github.com/nijjukrr/EDBYTES/tree/main/milestone-4
- **Starter Backup:** Original `task-fsd-03-beginner-20261028 (1).zip` preserved untouched in `milestone-4/starter-backup/`

## Correct-Answer Run Details
- **Question 1 (`Which tag is a heading?`):** Selected `h1` -> **Correct!** (`"Correct! Well done."`)
- **Question 2 (`Which language styles a page?`):** Selected `CSS` -> **Correct!** (`"Correct! Well done."`)
- **Question 3 (`How many days in a week?`):** Selected `7` -> **Correct!** (`"Correct! Well done."`)
- **Final Score:** **`3 / 3`** (`Correct Answers: 3`, `Incorrect Answers: 0`, `"Excellent! Perfect score."`)
- **Screenshot:** [evidence/correct-run-result.png](evidence/correct-run-result.png)

## Mixed-Answer Run Details
- **Question 1 (`Which tag is a heading?`):** Selected `h1` -> **Correct**
- **Question 2 (`Which language styles a page?`):** Selected `SQL` -> **Incorrect** (`"Incorrect. The correct answer is CSS."`; `CSS` highlighted green, `SQL` marked red)
- **Question 3 (`How many days in a week?`):** Selected `7` -> **Correct**
- **Final Score:** **`2 / 3`** (`Correct Answers: 2`, `Incorrect Answers: 1`, `"Great work! You are almost there."`)
- **Screenshot:** [evidence/mixed-run-result.png](evidence/mixed-run-result.png) (and answered Q2 state in [evidence/question-answered.png](evidence/question-answered.png))

## Four Official Checklist Results
1. **Read the provided question array:** **PASS**
2. **Show one question and its answer buttons:** **PASS**
3. **Count each question only once and show correct/incorrect text:** **PASS**
4. **Show the score out of three after the final answer:** **PASS**

## Implementation Decision
Combined an immediate boolean `answered` guard inside `handleAnswer()` with disabling all `.choice-btn` elements and hiding `#next` until `answered === true`. This double-layer guard ensures neither rapid multi-clicks on answer choices nor premature Next button triggers can double-count scores or skip questions.

## Learning Observation
*(Suggested draft — please review and personalize in your own words before final mentor submission.)*

Implementing state guards (`answered` flag plus explicit bounds checking before reading `questions[index]`) highlighted how easily fast clicks or boundary transitions can cause off-by-one errors or double-counting in interactive quizzes. Running automated correct, mixed-answer, and boundary-click runs in Chrome verified that every edge case behaves predictably.
