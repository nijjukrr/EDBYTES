# EdBytes Milestone 3 — A Small Task List

**Internship Track:** Full Stack Development  
**Task Revision:** beginner-20261028  
**Student:** Nishanth K (GitHub: [nijjukrr](https://github.com/nijjukrr))  
**Project:** TASKFLOW — Personal Task List  
**Target Folder:** `milestone-3-task-list/`  

---

## Required Check 1 — Add nonblank tasks

**Status: PASS**

### Implementation & Verification
- The task form with ID `form` listens for the `submit` event, which handles both clicking the "Add Task" button and pressing the Enter key inside the `<input id="text">`.
- In `app.js`, `e.preventDefault()` prevents any default browser navigation or page reload.
- The input value is read and sanitized with `.trim()`.
- If the trimmed string is empty (`!text`), the submission is rejected immediately. No item is added to the array, the input field is refocused, and the accessible status message displays: `"Please enter a task."`.
- If the trimmed string exceeds the 200-character maximum length, the submission is rejected with `"Task must be 200 characters or fewer."`.
- When valid nonblank text is submitted, it is pushed into the `tasks` array, `save()` is invoked to persist to `localStorage`, `render()` updates the DOM, the input is cleared, and `"Task added successfully."` is announced.
- **Verification Evidence:** In automated test 2 and test 3, adding `"Complete EdBytes task"` and `"Practise JavaScript"` updated the array and DOM counter immediately, while tests 4 and 5 confirmed that blank (`""`) and whitespace-only (`"     "`) inputs were rejected with zero tasks added.

---

## Required Check 2 — Delete tasks

**Status: PASS**

### Implementation & Verification
- Every rendered task item in `<ul id="list">` has its own dedicated `<button class="btn-delete">Delete</button>`.
- The delete action uses the task's index in the array (`tasks.splice(index, 1)`).
- Deleting one specific item does not touch or alter any other tasks.
- Following removal, `save()` updates `localStorage`, `render()` re-renders the list, the task counter recalculates, and the status message updates to `"Task deleted."`.
- Each Delete button includes an explicit `aria-label="Delete task: <name>"` so screen reader users know exactly which task is being removed.
- **Verification Evidence:** In test 6, with two tasks present (`"Complete EdBytes task"` and `"Practise JavaScript"`), clicking the Delete button for the first item removed only `"Complete EdBytes task"`, leaving `"Practise JavaScript"` intact. The task counter accurately decremented from `"2 tasks"` to `"1 task"`.

---

## Required Check 3 — Save and load

**Status: PASS**

### Implementation & Verification
- The application uses the exact supplied `localStorage` key: `'practice-tasks'`.
- On application startup, data is retrieved and parsed safely:
  ```javascript
  try {
    const raw = localStorage.getItem('practice-tasks');
    const saved = JSON.parse(raw || '[]');
    if (Array.isArray(saved)) {
      tasks = saved.filter(x => typeof x === 'string');
    }
  } catch (err) {
    console.warn('Could not parse saved tasks from localStorage:', err);
    tasks = [];
  }
  ```
- The save helper `save()` serializes the array to JSON and writes it back:
  ```javascript
  function save() {
    try {
      localStorage.setItem('practice-tasks', JSON.stringify(tasks));
      return true;
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err);
      showMessage('Storage unavailable. Changes may not persist after refresh.', 'warning');
      return false;
    }
  }
  ```
- **Verification Evidence:** Inspecting `localStorage.getItem('practice-tasks')` after adding tasks confirmed identical array contents in valid JSON format. Corrupted storage tests confirmed that the app does not crash when parsing malformed data.

---

## Required Check 4 — Refresh persistence

**Status: PASS**

### Implementation & Verification
- The refresh persistence requirement was verified using an automated headless Chrome session with Page reload:
  1. The task `"Learn DOM manipulation"` was added to the application.
  2. The page was completely reloaded (`Page.reload`).
  3. The DOM was re-inspected after the reload event.
- **Actual Result:** The saved tasks (`"Practise JavaScript"` and `"Learn DOM manipulation"`) were successfully restored from `localStorage`. The task counter correctly rendered `"2 tasks"`, and each task item retained its own functional Delete button.
- **Delete Persistence:** In test 8, deleting `"Practise JavaScript"` followed by another full page reload confirmed that the deleted task remained gone and did not re-appear after refresh.

---

## Ordinary test case

- **Input:** `"Complete EdBytes task"` entered into `<input id="text">`, followed by clicking the "Add Task" button.
- **Expected Outcome:** Task is appended to the list, counter increments from `"0 tasks"` to `"1 task"`, empty state disappears, input field is cleared, status message displays `"Task added successfully."`, and `localStorage['practice-tasks']` contains `["Complete EdBytes task"]`.
- **Actual Result (PASS):** Task element `<li class="task-item">` was created in `<ul id="list">`. Input was emptied, counter rendered `"1 task"`, status message showed `"Task added successfully."`, and storage matched the expected JSON array.

---

## Boundary or failure test case

### Case A: Whitespace-only input
- **Input:** `"     "` (5 spaces) submitted via the form.
- **Expected Outcome:** Rejected without adding a blank row. Input trimmed to empty string. Status message displays `"Please enter a task."`.
- **Actual Result (PASS):** Validation logic caught `!text.trim()`. Array length remained unchanged. Accessible status message rendered `"Please enter a task."`.

### Case B: Malformed JSON in `localStorage`
- **Input:** `localStorage.setItem('practice-tasks', 'MALFORMED{JSON:::')` injected, followed by a complete page reload.
- **Expected Outcome:** Application catches the parsing error without throwing an uncaught exception, falls back to `tasks = []`, displays the empty state `"No tasks yet. Add your first task to get started."`, and allows the user to continue adding new tasks.
- **Actual Result (PASS):** The `try/catch` block caught the JSON syntax error, logged a warning, initialized `tasks = []`, and rendered the empty state. Zero uncaught exceptions occurred in Chrome console.

### Case C: Cross-Site Scripting (XSS) / Special Characters
- **Input:** `<script>alert("test")</script><img src=x onerror=alert(1)>`
- **Expected Outcome:** Rendered strictly as literal plain text. No scripts executed; zero alert popups triggered.
- **Actual Result (PASS):** Rendered using `textContent`. Inspection of the DOM revealed `&lt;script&gt;alert("test")&lt;/script&gt;`, confirming total immunity against HTML injection.

---

## What I changed

1. **Completed Starter JavaScript TODOs**: Implemented the Add form handler to reject blank and whitespace input, validate the 200-character boundary, push to the `tasks` array, invoke `save()`, invoke `render()`, and clear the input. Implemented the Delete button click handler to splice the task by index, save to storage, and re-render.
2. **Elevated Visual Design (TASKFLOW)**: Styled the application with a modern dark theme using CSS custom properties (`--background: #0b1220;`, `--surface: #111c2e;`, `--primary: #22c55e;`, `--danger: #ef4444;`). Added subtle borders, rounded cards, and smooth hover/active transitions.
3. **Responsive Mobile Layout**: Built a flexbox layout that adapts cleanly to small screens (360px), collapsing the input and button into a full-width column, wrapping long words (`overflow-wrap: anywhere;`), and ensuring zero horizontal scroll.
4. **Enhanced Accessibility**: Maintained the starter's focus-visible outline (`:focus-visible`), provided explicit `<label for="text">`, descriptive `aria-label` attributes on delete buttons, and polite status announcements on the `#message` element.
5. **Interactive Feedback**: Added a live task counter (`"0 tasks"`, `"1 task"`, `"n tasks"`), an empty state placeholder (`"No tasks yet. Add your first task to get started."`), and a live character counter (`0/200`).

---

## What I learned

One genuine learning observation from this project is the critical distinction between using `textContent` versus `innerHTML` when handling dynamic user input in DOM operations. Using `textContent` ensures that user input is always parsed strictly as literal character data rather than HTML or executable JavaScript, neutralizing Cross-Site Scripting (XSS) vulnerabilities at the rendering layer. Furthermore, I learned the importance of wrapping `localStorage` interactions in defensive `try/catch` blocks, as real-world browser storage can fail due to private browsing modes, quota limitations, or corrupted data.

---

## Submission links

- **Repository:**  
  [https://github.com/nijjukrr/EDBYTES](https://github.com/nijjukrr/EDBYTES)

- **Project Folder:**  
  `milestone-3-task-list/`  
  [https://github.com/nijjukrr/EDBYTES/tree/main/milestone-3-task-list](https://github.com/nijjukrr/EDBYTES/tree/main/milestone-3-task-list)

- **Live Application (GitHub Pages):**  
  [https://nijjukrr.github.io/EDBYTES/milestone-3-task-list/](https://nijjukrr.github.io/EDBYTES/milestone-3-task-list/)

- **Source-Folder Access:**  
  The complete source code and assets are available in the public GitHub repository above under the `milestone-3-task-list/` directory.

---

## Final Verification Checklist

| Requirement | Status | Evidence |
| :--- | :--- | :--- |
| **Add nonblank task** | **PASS** | Verified in automated Test 2 & 3 (ordinary + keyboard addition) |
| **Delete task** | **PASS** | Verified in automated Test 6 (individual item spliced, counter updated) |
| **Save/load helper** | **PASS** | Verified in automated Test 2, 7 & 11 (persists to `practice-tasks`, error-resilient) |
| **Refresh persistence** | **PASS** | Verified in automated Test 7 (page reload restores full state) |
| **Responsive design (360px)** | **PASS** | Verified in automated Test 12 (scrollWidth 360px <= clientWidth 360px) |
| **Console errors** | **PASS** | 0 uncaught exceptions recorded across all 12 tests |
