(() => {
  'use strict';

  /* --- Four Explicit Arithmetic Functions --- */
  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }
    return a / b;
  }

  /* --- DOM Elements --- */
  const inputA = document.getElementById('a');
  const inputB = document.getElementById('b');
  const operationsEl = document.getElementById('operations');
  const resultPanel = document.getElementById('result');
  const resultBadge = document.getElementById('result-badge');
  const resultExpression = document.getElementById('result-expression');
  const resultValue = document.getElementById('result-value');
  const resultMessage = document.getElementById('result-message');
  const swapBtn = document.getElementById('swap-btn');
  const clearBtn = document.getElementById('clear-btn');
  const historyCard = document.getElementById('history-card');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history-btn');

  const OPERATION_META = {
    '+': { name: 'Addition', symbol: '+' },
    '-': { name: 'Subtraction', symbol: '−' },
    '*': { name: 'Multiplication', symbol: '×' },
    '/': { name: 'Division', symbol: '÷' },
  };

  let history = [];

  function formatNumber(num) {
    const clean = Object.is(num, -0) ? 0 : num;
    if (clean === 0) return '0';
    const abs = Math.abs(clean);
    if (abs >= 1e-12 && abs < 1e15) {
      return String(Number(clean.toPrecision(12)));
    }
    return String(clean);
  }

  function setActiveButton(op) {
    operationsEl.querySelectorAll('.op-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.op === op);
    });
  }

  function showError(msg, opLabel = 'Validation Error') {
    resultPanel.className = 'result-panel is-error';
    resultBadge.textContent = 'Error';
    resultExpression.textContent = opLabel;
    resultValue.textContent = msg;
    resultMessage.textContent = 'Check your inputs and try again.';
  }

  function showSuccess(op, a, b, answer) {
    const meta = OPERATION_META[op];
    const formattedAnswer = formatNumber(answer);
    const expr = formatNumber(a) + ' ' + meta.symbol + ' ' + formatNumber(b);

    resultPanel.className = 'result-panel is-success';
    resultBadge.textContent = meta.name;
    resultExpression.textContent = expr + ' =';
    resultValue.textContent = formattedAnswer;
    resultMessage.textContent = 'Calculated ' + meta.name.toLowerCase() + ' successfully.';

    history.unshift({ expr: expr, ans: formattedAnswer });
    if (history.length > 5) {
      history = history.slice(0, 5);
    }
    renderHistory();
  }

  function renderHistory() {
    historyList.replaceChildren();
    historyCard.hidden = history.length === 0;

    history.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'history-item';

      const exprEl = document.createElement('span');
      exprEl.className = 'history-expr';
      exprEl.textContent = item.expr;

      const ansEl = document.createElement('span');
      ansEl.className = 'history-ans';
      ansEl.textContent = '= ' + item.ans;

      li.append(exprEl, ansEl);
      historyList.append(li);
    });
  }

  function validateInputs() {
    if ((inputA.validity && inputA.validity.badInput) || (inputB.validity && inputB.validity.badInput)) {
      return { ok: false, error: 'Please enter valid numbers.' };
    }

    const rawA = inputA.value.trim();
    const rawB = inputB.value.trim();

    if (!rawA && !rawB) {
      return { ok: false, error: 'Please enter both numbers.' };
    }
    if (!rawA) {
      return { ok: false, error: 'Please enter the first number.' };
    }
    if (!rawB) {
      return { ok: false, error: 'Please enter the second number.' };
    }

    const numA = Number(rawA);
    const numB = Number(rawB);

    if (!Number.isFinite(numA) || !Number.isFinite(numB)) {
      return { ok: false, error: 'Please enter valid numbers.' };
    }

    return { ok: true, a: numA, b: numB };
  }

  function performOperation(op) {
    if (!OPERATION_META[op]) return;
    setActiveButton(op);

    const validated = validateInputs();
    if (!validated.ok) {
      showError(validated.error, OPERATION_META[op].name);
      return;
    }

    const a = validated.a;
    const b = validated.b;
    let output;

    try {
      switch (op) {
        case '+':
          output = add(a, b);
          break;
        case '-':
          output = subtract(a, b);
          break;
        case '*':
          output = multiply(a, b);
          break;
        case '/':
          output = divide(a, b);
          break;
        default:
          showError('Unsupported operation.');
          return;
      }
    } catch (err) {
      showError(err.message || 'Calculation error.', OPERATION_META[op].name);
      return;
    }

    if (!Number.isFinite(output)) {
      showError('Result is outside valid finite range.', OPERATION_META[op].name);
      return;
    }

    showSuccess(op, a, b, output);
  }

  /* Event Delegation on #operations */
  operationsEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-op]');
    if (!button) return;
    performOperation(button.dataset.op);
  });

  swapBtn.addEventListener('click', () => {
    const temp = inputA.value;
    inputA.value = inputB.value;
    inputB.value = temp;
  });

  clearBtn.addEventListener('click', () => {
    inputA.value = '';
    inputB.value = '';
    setActiveButton(null);
    resultPanel.className = 'result-panel';
    resultBadge.textContent = 'Ready';
    resultExpression.textContent = 'Waiting for numbers';
    resultValue.textContent = '—';
    resultMessage.textContent = 'Enter values for A and B, then choose Add, Subtract, Multiply, or Divide.';
    inputA.focus();
  });

  clearHistoryBtn.addEventListener('click', () => {
    history = [];
    renderHistory();
  });
})();
