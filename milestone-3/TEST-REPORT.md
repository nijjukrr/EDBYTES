# Milestone 3 — Test Report (`TASKFLOW — Smart Task Manager`)

All tests were executed in real headless Google Chrome (`1440×900` desktop and `1920×1080` down to `360×740` responsive widths) against the live local HTTP server serving `milestone-3/`.

## Official Mandatory Checklist

| # | Mandatory Requirement | Status | Verification Summary |
|---|---|---|---|
| 1 | Connect Add button / form to add non-blank text | **PASS** | Valid tasks added via button click & `Enter`; whitespace-only `"     "` rejected with error notice. |
| 2 | Add Delete action for each task | **PASS** | Individual `Delete` button removes only the targeted task by stable `id`. |
| 3 | Use supplied `save()` / load helper after changes | **PASS** | `save()` writes `'practice-tasks'` to `localStorage` on every add, toggle, delete, and clear; `loadTasks()` restores on load. |
| 4 | Refresh and show that saved tasks return | **PASS** | Reloading the browser restores added tasks, completion state, and excludes deleted tasks. |

## Detailed Test Cases

| Test | Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Test 1 | Add valid task (`"Complete Java assignment"`) | Task appears, input clears, total count = 1, saved in `localStorage` | `count: 1`, `firstText: "Complete Java assignment"`, `inputCleared: true`, `totalStat: "1"`, `savedCount: 1` | **PASS** |
| Test 2 | Reject blank input (`"     "`) | Task rejected, count unchanged, error status shown | `count: 1`, `isError: true`, `statusMsg: "Please enter a non-blank task before adding."` | **PASS** |
| Test 3 | Add 2nd task (`"Revise DBMS notes"`) & delete 1st | 1st removed, 2nd stays, `localStorage` updated | `count: 1`, `remainingText: "Revise DBMS notes"`, `savedTexts: ["Revise DBMS notes"]` | **PASS** |
| Test 4 | Persistence after refresh (`"Prepare for mentor review"`) | Added task remains after `page.reload()` with accurate stats | `texts: ["Prepare for mentor review", "Revise DBMS notes"]`, `totalStat: "2"`, `pendingStat: "2"` | **PASS** |
| Test 5 | Persistence after deletion | Deleted task does not reappear after `page.reload()` | `deletedReturned: false`, `texts: ["Revise DBMS notes"]` | **PASS** |
| Test 6 | Special characters (`"Study HTML & CSS <Basics>"`) | Rendered as literal text via `textContent`, 0 injected HTML elements | `text: "Study HTML & CSS <Basics>"`, `childElementCount: 0` | **PASS** |
| Test 7 | Long input (200 chars & 205 chars) | 200-char string accepted with `overflowX: false`; 205-char submit rejected | `addedLength: 200`, `overflowX: false`; 205-char rejected (`"Task exceeds the 200-character limit (205/200)."`, `stillNo205: true`) | **PASS** |
| Test 8 | Malformed `localStorage` (`"{invalid-json!!"`) | Recovers safely without crashing, shows empty state & notice | `taskCount: 0`, `emptyVisible: true`, `recoveredArray: true`, status `"Recovered from invalid saved data. Starting with a clean task list."` | **PASS** |
| Test 9 | Responsive layout (`1920`, `1440`, `1280`, `1024`, `820`, `768`, `430`, `390`, `375`, `360`) | 0 horizontal overflow, form/buttons/stats fit cleanly | All 10 viewports: `overflowX: false`, `formFits: true`, `deleteBtnsFit: true`, `statsFit: true` | **PASS** |
| Test 10 | Browser console & assets | 0 console errors, 0 uncaught exceptions, 0 failed asset loads | `consoleErrors: []`, `pageErrors: []`, `failedRequests: []` | **PASS** |
| Extra | Completion toggle persistence & Clear All confirmation | Completed state persists across reload; Clear All empties list only on Confirm | `total: "4", pending: "3", completed: "1"` after reload; Clear All -> Confirm -> `count: 0`, `emptyVisible: true` | **PASS** |

## Limitations
- `localStorage` persistence is local to one browser profile/device and does not sync across devices.
- Remote GitHub Pages verification is recorded separately once pushed to `main`.
