let currentAnswer = '';
let guessCount = 0;
const maxGuesses = 6;

function getDailyAnswer() {
  const today = new Date().toISOString().slice(0, 10);
  const seed = today.split('-').join('');
  const index = parseInt(seed) % youtubers.length;
  return youtubers[index].toLowerCase();
}

function submitGuess() {
  const input = document.getElementById('guessInput');
  const guess = input.value.trim().toLowerCase();
  const board = document.getElementById('board');
  const message = document.getElementById('message');
  if (!guess) return;

  if (!youtubers.map(n => n.toLowerCase()).includes(guess)) {
    message.textContent = 'Not on the list!';
    return;
  }

  const row = document.createElement('div');
  row.className = 'guess-row';

  const answerLetters = currentAnswer.split('');
  const guessLetters = guess.split('');
  const maxLen = Math.max(answerLetters.length, guessLetters.length);

  for (let i = 0; i < maxLen; i++) {
    const cell = document.createElement('span');
    const letter = guessLetters[i] || '';
    cell.textContent = letter.toUpperCase();
    cell.style.padding = '10px';
    cell.style.borderRadius = '8px';

    if (letter === answerLetters[i]) {
      cell.className = 'correct';
    } else if (answerLetters.includes(letter)) {
      cell.className = 'close';
    } else {
      cell.className = 'wrong';
    }
    row.appendChild(cell);
  }

  board.appendChild(row);
  guessCount++;
  input.value = '';

  if (guess === currentAnswer) {
    message.textContent = '🎉 Correct! You win!';
    input.disabled = true;
  } else if (guessCount >= maxGuesses) {
    message.textContent = `😢 Out of tries! Answer was: ${currentAnswer}`;
    input.disabled = true;
  }
}

window.onload = () => {
  currentAnswer = getDailyAnswer();
};
