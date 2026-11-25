(() => {
  'use strict';

  const STORAGE_KEY = 'practice-tasks';
  const MAX_LENGTH = 200;

  const form = document.getElementById('form');
  const input = document.getElementById('text');
  const list = document.getElementById('list');
  const message = document.getElementById('message');
  const emptyState = document.getElementById('empty-state');
  const charCount = document.getElementById('char-count');
  const currentDateEl = document.getElementById('current-date');
  const statTotal = document.getElementById('stat-total');
  const statPending = document.getElementById('stat-pending');
  const statCompleted = document.getElementById('stat-completed');
  const tasksSummary = document.getElementById('tasks-summary');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const clearConfirm = document.getElementById('clear-confirm');
  const confirmClearBtn = document.getElementById('confirm-clear-btn');
  const cancelClearBtn = document.getElementById('cancel-clear-btn');

  let tasks = [];

  function createTaskId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'task-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
  }

  function formatToday() {
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date());
  }

  function formatTaskDate(isoString) {
    const parsed = new Date(isoString);
    if (Number.isNaN(parsed.getTime())) return 'Saved locally';
    return 'Added ' + new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
    }).format(parsed);
  }

  function setStatus(text, tone = '') {
    message.textContent = text;
    message.className = 'status-message' + (tone ? ' is-' + tone : '');
  }

  function updateCharCounter() {
    const len = input.value.length;
    charCount.textContent = len + ' / ' + MAX_LENGTH;
    charCount.classList.toggle('is-limit', len >= MAX_LENGTH);
  }

  function normalizeTaskRecord(item) {
    // Support both starter plain-string tasks and object records
    if (typeof item === 'string') {
      const trimmed = item.trim();
      if (!trimmed || trimmed.length > MAX_LENGTH) return null;
      return {
        id: createTaskId(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
      };
    }

    if (item && typeof item === 'object' && typeof item.text === 'string') {
      const trimmed = item.text.trim();
      if (!trimmed || trimmed.length > MAX_LENGTH) return null;
      return {
        id: typeof item.id === 'string' && item.id.trim() ? item.id : createTaskId(),
        text: trimmed,
        completed: Boolean(item.completed),
        createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
      };
    }

    return null;
  }

  function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      tasks = [];
      return;
    }

    try {
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved)) {
        throw new Error('Stored tasks payload is not an array');
      }
      tasks = saved.map(normalizeTaskRecord).filter(Boolean);
    } catch {
      tasks = [];
      save();
      setStatus('Recovered from invalid saved data. Starting with a clean task list.', 'error');
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    statTotal.textContent = String(total);
    statPending.textContent = String(pending);
    statCompleted.textContent = String(completed);
    tasksSummary.textContent = total === 1 ? '1 item' : total + ' items';

    emptyState.hidden = total > 0;
    clearAllBtn.hidden = total === 0 || !clearConfirm.hidden;
    if (total === 0) {
      clearConfirm.hidden = true;
    }
  }

  function deleteTask(taskId) {
    const target = tasks.find((task) => task.id === taskId);
    if (!target) return;

    tasks = tasks.filter((task) => task.id !== taskId);
    save();
    render();
    setStatus('Task deleted.', 'success');
  }

  function toggleTask(taskId) {
    const target = tasks.find((task) => task.id === taskId);
    if (!target) return;

    target.completed = !target.completed;
    save();
    render();
    setStatus(target.completed ? 'Task marked complete.' : 'Task marked pending.', 'success');
  }

  function render() {
    list.replaceChildren();

    tasks.forEach((task) => {
      const row = document.createElement('li');
      row.className = 'task-item' + (task.completed ? ' is-completed' : '');
      row.dataset.id = task.id;

      const mainWrap = document.createElement('div');
      mainWrap.className = 'task-main';

      const checkLabel = document.createElement('label');
      checkLabel.className = 'task-check-wrap';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.checked = task.completed;
      checkbox.setAttribute('aria-label', 'Mark "' + task.text + '" as completed');
      checkbox.addEventListener('change', () => toggleTask(task.id));

      checkLabel.append(checkbox);

      const content = document.createElement('div');
      content.className = 'task-content';

      const textEl = document.createElement('span');
      textEl.className = 'task-text';
      textEl.textContent = task.text;

      const metaEl = document.createElement('span');
      metaEl.className = 'task-meta';
      metaEl.textContent = formatTaskDate(task.createdAt);

      content.append(textEl, metaEl);
      mainWrap.append(checkLabel, content);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.setAttribute('aria-label', 'Delete task: ' + task.text);
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      row.append(mainWrap, deleteBtn);
      list.append(row);
    });

    updateStats();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const trimmed = input.value.trim();

    if (!trimmed) {
      setStatus('Please enter a non-blank task before adding.', 'error');
      input.focus();
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setStatus('Task exceeds the 200-character limit (' + trimmed.length + '/200).', 'error');
      input.focus();
      return;
    }

    const newTask = {
      id: createTaskId(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(newTask);
    save();
    render();

    input.value = '';
    updateCharCounter();
    setStatus('Task added.', 'success');
    input.focus();
  });

  input.addEventListener('input', () => {
    updateCharCounter();
    if (message.classList.contains('is-error')) {
      setStatus('');
    }
  });

  clearAllBtn.addEventListener('click', () => {
    clearAllBtn.hidden = true;
    clearConfirm.hidden = false;
    cancelClearBtn.focus();
  });

  cancelClearBtn.addEventListener('click', () => {
    clearConfirm.hidden = true;
    clearAllBtn.hidden = tasks.length === 0;
  });

  confirmClearBtn.addEventListener('click', () => {
    tasks = [];
    save();
    clearConfirm.hidden = true;
    render();
    setStatus('All tasks cleared.', 'success');
    input.focus();
  });

  /* --- Initialize --- */
  currentDateEl.textContent = formatToday();
  updateCharCounter();
  loadTasks();
  render();
})();
