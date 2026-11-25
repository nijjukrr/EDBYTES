(() => {
  'use strict';

  /* Exact Official Starter Question Array (Single Source of Truth) */
  const questions = [
    {
      text: 'Which tag is a heading?',
      choices: ['h1', 'p', 'div'],
      answer: 0,
    },
    {
      text: 'Which language styles a page?',
      choices: ['CSS', 'SQL', 'C++'],
      answer: 0,
    },
    {
      text: 'How many days in a week?',
      choices: ['5', '7', '9'],
      answer: 1,
    },
  ];

  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  const startBtn = document.getElementById('start-btn');
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const feedbackEl = document.getElementById('feedback');
  const nextBtn = document.getElementById('next');
  const progressLabel = document.getElementById('progress-label');
  const progressPercent = document.getElementById('progress-percent');
  const progressBarWrap = document.getElementById('progress-bar-wrap');
  const progressFill = document.getElementById('progress-fill');
  const scoreEl = document.getElementById('score');
  const resultMessageEl = document.getElementById('result-message');
  const correctCountEl = document.getElementById('correct-count');
  const wrongCountEl = document.getElementById('wrong-count');
  const restartBtn = document.getElementById('restart-btn');
  const metaCountEl = document.getElementById('meta-count');

  let index = 0;
  let score = 0;
  let answered = false;

  const CHOICE_KEYS = ['A', 'B', 'C', 'D'];

  function updateProgress() {
    const total = questions.length;
    const currentNumber = Math.min(index + 1, total);
    const pct = Math.min(100, Math.round((currentNumber / total) * 100));

    progressLabel.textContent = 'Question ' + currentNumber + ' of ' + total;
    progressPercent.textContent = pct + '%';
    progressFill.style.width = pct + '%';
    progressBarWrap.setAttribute('aria-valuenow', String(pct));
  }

  function startQuiz() {
    index = 0;
    score = 0;
    answered = false;
    startScreen.hidden = true;
    resultScreen.hidden = true;
    quizScreen.hidden = false;
    render();
  }

  function render() {
    if (index >= questions.length) {
      showFinalScore();
      return;
    }

    const currentQuestion = questions[index];
    answered = false;

    questionEl.textContent = currentQuestion.text;
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback-banner';
    feedbackEl.hidden = true;

    nextBtn.hidden = true;
    nextBtn.disabled = true;
    nextBtn.textContent = index === questions.length - 1 ? 'See Final Score' : 'Next Question';

    updateProgress();
    answersEl.replaceChildren();

    currentQuestion.choices.forEach((choiceText, choiceIndex) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.dataset.index = String(choiceIndex);

      const left = document.createElement('span');
      left.className = 'choice-left';

      const keyBadge = document.createElement('span');
      keyBadge.className = 'choice-key';
      keyBadge.textContent = CHOICE_KEYS[choiceIndex] || String(choiceIndex + 1);

      const label = document.createElement('span');
      label.className = 'choice-label';
      label.textContent = choiceText;

      left.append(keyBadge, label);

      const statusBadge = document.createElement('span');
      statusBadge.className = 'choice-badge';
      statusBadge.setAttribute('aria-hidden', 'true');

      btn.append(left, statusBadge);
      btn.addEventListener('click', () => handleAnswer(choiceIndex));
      answersEl.append(btn);
    });
  }

  function handleAnswer(selectedIndex) {
    if (answered || index >= questions.length) return;
    answered = true;

    const currentQuestion = questions[index];
    const correctIndex = currentQuestion.answer;
    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
      score += 1;
    }

    const buttons = answersEl.querySelectorAll('.choice-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      const badge = btn.querySelector('.choice-badge');
      if (idx === correctIndex) {
        btn.classList.add('is-correct');
        if (badge) badge.textContent = '✓ Correct';
      } else if (idx === selectedIndex) {
        btn.classList.add('is-wrong');
        if (badge) badge.textContent = '✕ Selected';
      } else {
        btn.classList.add('is-dimmed');
      }
    });

    if (isCorrect) {
      feedbackEl.textContent = 'Correct! Well done.';
      feedbackEl.className = 'feedback-banner is-correct';
    } else {
      feedbackEl.textContent = 'Incorrect. The correct answer is ' + currentQuestion.choices[correctIndex] + '.';
      feedbackEl.className = 'feedback-banner is-wrong';
    }
    feedbackEl.hidden = false;

    nextBtn.hidden = false;
    nextBtn.disabled = false;
  }

  function nextQuestion() {
    if (!answered) return;
    index += 1;
    if (index >= questions.length) {
      showFinalScore();
    } else {
      render();
    }
  }

  function getScoreMessage(finalScore, total) {
    if (finalScore === total) return 'Excellent! Perfect score.';
    if (finalScore === 2) return 'Great work! You are almost there.';
    if (finalScore === 1) return 'Good attempt. Keep practicing.';
    return 'Keep learning and try again.';
  }

  function showFinalScore() {
    const total = questions.length;
    const wrong = total - score;

    quizScreen.hidden = true;
    resultScreen.hidden = false;

    scoreEl.textContent = score + ' / ' + total;
    correctCountEl.textContent = String(score);
    wrongCountEl.textContent = String(wrong);
    resultMessageEl.textContent = getScoreMessage(score, total);
  }

  function restartQuiz() {
    startQuiz();
  }

  metaCountEl.textContent = String(questions.length);
  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', restartQuiz);
})();
