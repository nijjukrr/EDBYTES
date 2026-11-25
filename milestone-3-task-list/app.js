/**
 * EdBytes Full Stack Development Internship - Milestone 3
 * Task: A Small Task List (Revision: beginner-20261028)
 * Application: TASKFLOW — Personal Task List
 */

// DOM Elements
const list = document.getElementById('list');
const form = document.getElementById('form');
const input = document.getElementById('text');
const message = document.getElementById('message');
const taskCounter = document.getElementById('task-counter');
const charCount = document.getElementById('char-count');

// Task state initialized from localStorage
let tasks = [];

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

/**
 * Persists the current tasks array to localStorage.
 * Handles storage exceptions gracefully.
 */
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

/**
 * Displays accessible status messages with appropriate severity.
 * @param {string} text - Message text
 * @param {'info' | 'success' | 'error' | 'warning'} type - Visual severity type
 */
function showMessage(text, type = 'info') {
  if (!message) return;
  message.textContent = text;
  message.className = `status-message status-${type}`;
}

/**
 * Updates the task counter element with singular/plural wording.
 */
function updateCounter() {
  if (!taskCounter) return;
  const count = tasks.length;
  taskCounter.textContent = count === 1 ? '1 task' : `${count} tasks`;
}

/**
 * Renders the task list into the DOM using safe textContent.
 * Shows empty state when no tasks are present.
 */
function render() {
  list.replaceChildren();
  updateCounter();

  if (tasks.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'No tasks yet. Add your first task to get started.';
    list.append(emptyItem);
    return;
  }

  tasks.forEach((text, index) => {
    const row = document.createElement('li');
    row.className = 'task-item';

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'task-content';

    const indexBadge = document.createElement('span');
    indexBadge.className = 'task-index';
    indexBadge.textContent = `${index + 1}.`;
    indexBadge.setAttribute('aria-hidden', 'true');

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    // STRICT SECURITY: Always use textContent to prevent XSS / HTML injection
    textSpan.textContent = text;

    contentWrapper.append(indexBadge, textSpan);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-delete';
    button.textContent = 'Delete';
    button.setAttribute('aria-label', `Delete task: ${text}`);

    button.onclick = () => {
      tasks.splice(index, 1);
      save();
      render();
      showMessage('Task deleted.', 'info');
    };

    row.append(contentWrapper, button);
    list.append(row);
  });
}

// Form submission handler
form.onsubmit = e => {
  e.preventDefault();
  const rawValue = input.value;
  const text = rawValue.trim();

  // Validate non-blank
  if (!text) {
    showMessage('Please enter a task.', 'error');
    input.focus();
    return;
  }

  // Validate character length
  if (text.length > 200) {
    showMessage('Task must be 200 characters or fewer.', 'error');
    input.focus();
    return;
  }

  // Add task to array
  tasks.push(text);
  save();
  render();

  // Reset input and counter
  input.value = '';
  if (charCount) {
    charCount.textContent = '0/200';
    charCount.classList.remove('char-count-overflow');
  }
  input.focus();
  showMessage('Task added successfully.', 'success');
};

// Live character counter listener
if (input && charCount) {
  input.addEventListener('input', () => {
    const len = input.value.length;
    charCount.textContent = `${len}/200`;
    if (len > 200) {
      charCount.classList.add('char-count-overflow');
    } else {
      charCount.classList.remove('char-count-overflow');
    }
  });
}

// Initial render on page load
render();
