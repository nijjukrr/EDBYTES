# EdBytes Milestone 2 — Completion Report

## Required Check 1: About
The personal introduction for **Nijju** (`Full Stack Developer | Student Developer`, *EdBytes — Full Stack Development Internship*) appears immediately on initial load inside the visible `<section aria-labelledby="about-heading">` card within the fixed studio dock (`#edbytesDock`) on both desktop (`> 820px`) and mobile (`<= 820px`) without requiring document scrolling. It is also accessible from the `contacts` dialog in the fixed navigation bar. Fictional Haldoren branding is visually separated inside the hanging lanyard pass prop.

## Required Check 2: Project Card
The required featured project card is rendered inside `<section aria-labelledby="project-heading">` (`<article class="card">`) directly beneath the About section on both desktop and mobile Hero views (and inside the `discuss a project` dialog):
- **Title:** InternBoard — Internship Listing Platform
- **Description:** Responsive internship listing platform with search, filtering, details, and application submission demonstrating frontend development and backend API integration.
- **Technologies:** HTML, CSS, JavaScript, Node.js, Express.js, SQLite
- **GitHub Repository:** https://github.com/nijjukrr/EDVYRO--RESPONSIVE-Internship-
- **Live Static Frontend Demo:** https://nijjukrr.github.io/EDVYRO--RESPONSIVE-Internship-/
- **Backend Distinction:** Explicitly notes that GitHub Pages serves the static frontend demo while the Node.js/Express.js/SQLite backend runs locally from the repository.

## Required Check 3: Responsive Design
Tested in headless Google Chrome across 10 viewport sizes in both Hero and Case modes:
- `360×740` (Mobile boundary): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `375×812` (Mobile): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `390×844` (Mobile): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `430×932` (Large Mobile): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `768×1024` (Tablet Portrait): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `820×1180` (Breakpoint edge): PASS — `overflowX: false`, unclipped nav/cards/ticket, laptop visible.
- `1024×768` (Small Desktop): PASS — `overflowX: false`, unclipped nav/dock/ticket, laptop visible.
- `1280×720` (Laptop HD): PASS — `overflowX: false`, unclipped nav/dock/ticket, laptop visible.
- `1440×900` (Desktop): PASS — `overflowX: false`, unclipped nav/dock/ticket, laptop visible.
- `1920×1080` (Full HD): PASS — `overflowX: false`, unclipped nav/dock/ticket, laptop visible.

## Required Check 4: Publication and Evidence
- **Verified Live URL:** https://nijjukrr.github.io/EDBYTES/ *(Status: Published & Verified HTTP `200` on GitHub Pages, `main` / `/ (root)`)*
- **Source Repository:** https://github.com/nijjukrr/EDBYTES.git (branch: `main`)
- **Starter Backup:** Original 8 starter files from `task-fsd-01-beginner-20261028.zip` preserved untouched in `starter-backup/`.
- **Evidence Screenshots:**
  - `docs/evidence/portfolio-desktop.png`
  - `docs/evidence/portfolio-mobile.png`
  - `docs/evidence/hero-desktop.png`
  - `docs/evidence/case-desktop.png`
  - `docs/evidence/hero-mobile.png`
  - `docs/evidence/case-mobile.png`

## Ordinary Test
Opened `index.html` over local HTTP in headless Google Chrome at `1440×900`. Verified zero console/page errors, all supplied images loaded (`heroPlate`, `cutout`, `badge`, `casePlate`), entrance animations completed to full opacity, **About (Nijju)** and **InternBoard** cards were visible and readable with active links, and diving into the laptop transitioned cleanly through all 3 case videos (`01 / 03` -> `02 / 03` -> `03 / 03` -> wrap `01 / 03`) and back to the studio hero.

## Boundary Test
1. **Narrow viewport (`360×740`):** Verified zero horizontal overflow (`scrollWidth <= innerWidth`), zero clipped navigation buttons, unclipped mobile ticket card, and accessible `Live Demo` / `GitHub Repo` links.
2. **Blocked external media (`images.higgs.ai` and `.mp4` aborted):** Verified `.stage.hero-img-failed` fallback kept the studio gradient and About/InternBoard cards readable (`navOpacity: 1`), transitioning to case mode displayed `.case-video-fallback` without locking `busy`, and returning to hero worked normally.
3. **Reduced motion (`prefers-reduced-motion: reduce`):** Verified immediate reveal (`navOpacity: 1`, `wordmarkOpacity: 1`) and fast case transition (`65ms`).

## Learning Observation
*(Draft prepared from implementation observations — review and personalize if desired before final submission.)*

Combining a fixed-viewport `1440 × 810` photographic motion composition with real portfolio requirements taught me that decorative transitions must never trap or hide core content. Visual screenshot inspection caught subtle issues (such as a scroll hint remaining visible in case mode and badge/script overlap) that DOM bounds checks alone missed, reinforcing why inspecting actual rendered screenshots across mobile and desktop widths is essential.

---

# EdBytes Milestone 3 — Completion Report

- **Title:** TASKFLOW — Smart Task Manager (`Milestone 3: A Small Task List`)
- **Live URL:** https://nijjukrr.github.io/EDBYTES/milestone-3/
- **Source Folder URL:** https://github.com/nijjukrr/EDBYTES/tree/main/milestone-3
- **Starter Backup:** Untouched copy of `task-fsd-02-beginner-20261028.zip` preserved in `milestone-3/starter-backup/`

## Mandatory Requirements Results
1. **Connect the Add button or form to add non-blank text:** **PASS** — Form submits on button click and `Enter`, trims whitespace, rejects blank/whitespace-only and >200-char inputs with visible status messages.
2. **Add a Delete action for each task:** **PASS** — Every task row renders an individual `Delete` button bound to that task's stable unique `id`.
3. **Use the supplied save/load helper after changes:** **PASS** — Every add, completion toggle, delete, and clear action calls `save()` using the `'practice-tasks'` `localStorage` key, and `loadTasks()` validates stored data on startup.
4. **Refresh and show that saved tasks return:** **PASS** — Verified in headless Chrome across reloads that added tasks and completion states persist and deleted tasks do not return.

## Test Note
Tested in headless Google Chrome across desktop (`1920×1080`, `1440×900`, `1280×720`, `1024×768`), tablet (`820×1180`, `768×1024`), and mobile (`430×932`, `390×844`, `375×812`, `360×740`) viewports with 0 horizontal overflow and 0 console/page errors. Verified blank-input rejection, special characters (`"Study HTML & CSS <Basics>"`) safe rendering via `textContent`, 200-char limit & 205-char rejection, and recovery from malformed JSON in `localStorage`. Full details are documented in [milestone-3/TEST-REPORT.md](milestone-3/TEST-REPORT.md).

## Implementation Decision
Preserved the starter's `tasks` array, `'practice-tasks'` `localStorage` key, `save()`, and `render()` workflow while normalizing records with stable unique `id` values (`crypto.randomUUID()` with timestamp fallback). Deleting by `id` rather than array index prevents stale-index deletion bugs, and normalizing both legacy plain strings and `{ id, text, completed, createdAt }` objects keeps existing saved tasks compatible.

## Learning Observation
*(Suggested draft — please review and personalize in your own words before final mentor submission.)*

Testing edge cases early—such as malformed `localStorage` JSON, programmatic over-limit input, and CSS `[hidden]` overrides against `display: flex`—showed how quickly subtle UI or storage assumptions can break a small app. Inspecting real desktop and mobile screenshots alongside automated assertions caught layout issues that numeric checks alone missed.

---

# EdBytes Milestone 4 — Completion Report

- **Title:** QUIZLY — Interactive Knowledge Quiz (`Milestone 4: A Three-Question Quiz`, Task FSD-03)
- **Live URL:** https://nijjukrr.github.io/EDBYTES/milestone-4/
- **Source Folder URL:** https://github.com/nijjukrr/EDBYTES/tree/main/milestone-4
- **Starter Backup:** Untouched copy of `task-fsd-03-beginner-20261028 (1).zip` preserved in `milestone-4/starter-backup/`

## Mandatory Checklist Results
1. **Read the provided question array:** **PASS** — Preserved the exact 3-question `questions` array as single source of truth.
2. **Show one question and its answer buttons:** **PASS** — Displays one question at a time (`1 of 3` -> `3 of 3`) with dynamically rendered answer buttons.
3. **Count each question only once and show correct/incorrect text:** **PASS** — `answered` guard + disabled choices prevent double counting; immediate feedback shows `"Correct! Well done."` or `"Incorrect. The correct answer is CSS."`.
4. **Show the score out of three after the final answer:** **PASS** — Verified both `3 / 3` (correct run: `h1`, `CSS`, `7`) and `2 / 3` (mixed run: `h1`, `SQL`, `7`).

## Test & Evidence Summary
- Full test cases and 10-viewport responsive checks recorded in [milestone-4/TEST-REPORT.md](milestone-4/TEST-REPORT.md).
- Correct-answer run (`3 / 3`), mixed-answer run (`2 / 3`), implementation decision, and learning observation draft recorded in [milestone-4/SUBMISSION-EVIDENCE.md](milestone-4/SUBMISSION-EVIDENCE.md).
- Screenshots saved in `milestone-4/evidence/` (`quiz-start.png`, `question-answered.png`, `correct-run-result.png`, `mixed-run-result.png`, `mobile-quiz.png`).

---

# EdBytes Milestone 5 — Completion Report

- **Title:** CALCURA — Smart Calculator (`Milestone 5: Four-Operation Calculator`, Task FSD-04)
- **Live URL:** https://nijjukrr.github.io/EDBYTES/milestone-5/
- **Source Folder URL:** https://github.com/nijjukrr/EDBYTES/tree/main/milestone-5
- **Starter Backup:** Untouched copy of `task-fsd-04-beginner-20261028.zip` preserved in `milestone-5/starter-backup/`

## Mandatory Checklist Results
1. **Read two numeric inputs:** **PASS** — Reads `#a` and `#b`, validates raw strings & `badInput`, and converts with `Number()`.
2. **Implement Add, Subtract, Multiply and Divide with explicit functions:** **PASS** — Implements explicit `add()`, `subtract()`, `multiply()`, and `divide()` selected via `switch` on `data-op`.
3. **Show useful message for blank/non-numeric input and division by zero:** **PASS** — Rejects blank first/second/both inputs, non-numeric entries (`abc`), `0` and `-0` divisors, and non-finite overflows.
4. **Test all four operations and one invalid example:** **PASS** — Verified `20 + 10 = 30`, `20 − 10 = 10`, `20 × 10 = 200`, `20 ÷ 10 = 2`, and `20 ÷ 0 -> "Cannot divide by zero."`.

## Test & Evidence Summary
- Full 15-test verification and 10-viewport responsive results recorded in [milestone-5/TEST-REPORT.md](milestone-5/TEST-REPORT.md).
- Five required test examples, implementation decision, and editable learning observation recorded in [milestone-5/SUBMISSION-EVIDENCE.md](milestone-5/SUBMISSION-EVIDENCE.md).
- Screenshots saved in `milestone-5/evidence/` (`calculator-default.png`, `addition-result.png`, `subtraction-result.png`, `multiplication-result.png`, `division-result.png`, `validation-error.png`, `mobile-calculator.png`).
