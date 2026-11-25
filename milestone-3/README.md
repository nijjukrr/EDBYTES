# TASKFLOW — Smart Task Manager (EdBytes Milestone 3)

## Project Name
**TASKFLOW — Smart Task Manager**

## Milestone Name
**EdBytes Full Stack Development Internship — Milestone 3 (Task FSD-02: A Small Task List)**

## Project Description
TASKFLOW is a clean, responsive, beginner-friendly task management application built with HTML5, CSS3, and Vanilla JavaScript. It builds directly on the official EdBytes `task-fsd-02-beginner-20261028` starter pattern (`tasks` array, `save()`, `loadTasks()`, `render()`, and `localStorage` key `'practice-tasks'`) while adding dynamic dashboard statistics, safe DOM rendering, input validation, completion toggles, an accessible two-step Clear All confirmation, and responsive desktop/tablet/mobile layouts.

An untouched backup of the official starter pack is preserved inside `milestone-3/starter-backup/`.

## Technologies Used
- **HTML5** (semantic landmarks: `<header>`, `<main>`, `<section>`, `<form>`, `<label>`, `<input>`, `<button>`, `<ul>/<li>`, `<footer>`)
- **CSS3** (custom properties, CSS Grid & Flexbox, responsive media queries, `prefers-reduced-motion`, `:focus-visible`)
- **Vanilla JavaScript** (strict mode, `localStorage` persistence, safe `textContent` DOM rendering, stable task IDs)

## Features
- **Dynamic Dashboard Header:** Displays the TASKFLOW brand lockup, dynamic current date (`Intl.DateTimeFormat`), and live counts for **Total Tasks**, **Pending**, and **Completed**.
- **Validated Task Composer:** Trims leading/trailing whitespace, rejects empty/whitespace-only entries, enforces the 200-character limit both in HTML and JS with a live `0 / 200` counter, clears the input, focuses back on `#text`, and announces status updates (`role="status"`).
- **Safe Task Rendering & Individual Deletion:** Renders all task text via `textContent` (preventing HTML/script injection) and deletes tasks by stable unique ID (`id`), never stale array indexes.
- **Completion Toggles:** Allows checking/unchecking any task without affecting individual Delete controls, updating Pending/Completed counts and persisting across reloads.
- **Empty State & Safe Clear All:** Shows a clean empty state when no tasks exist and protects bulk deletion behind an inline `Confirm` / `Cancel` step.
- **Malformed Storage Recovery:** Recovers gracefully if `localStorage` contains invalid JSON or non-array data without crashing.

## How to Run Locally
No dependencies or build step are required.
1. Open `milestone-3/index.html` directly in your browser, or run a static HTTP server from the repository root:
   ```bash
   python -m http.server 8080
   ```
2. Visit `http://localhost:8080/milestone-3/`.

## How `localStorage` Works
- All tasks are stored as a JSON array under the consistent key `'practice-tasks'` in the browser's `window.localStorage`.
- On startup, `loadTasks()` parses `'practice-tasks'`, validates and normalizes records (supporting both legacy plain-string items and `{ id, text, completed, createdAt }` objects), and recovers to an empty array if corrupted.
- Every data-changing operation (add, toggle, delete, clear) calls `save()` and `render()` immediately.

## Known Limitations
- `localStorage` is scoped to the current browser and device origin; tasks do not synchronize across different devices, browsers, or users.
- Clearing site data or using private/incognito browsing resets stored tasks when the session closes.

## Live Deployment URL
https://nijjukrr.github.io/EDBYTES/milestone-3/

## Screenshots
- [Desktop Dashboard (Empty State)](evidence/desktop-dashboard.png)
- [Desktop with Multiple Tasks](evidence/desktop-tasks.png)
- [Mobile Dashboard (375px Empty State)](evidence/mobile-dashboard.png)
- [Mobile with Multiple Tasks (375px)](evidence/mobile-tasks.png)
