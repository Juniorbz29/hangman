document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("hangman");
  const ctx = canvas.getContext("2d");
  const wordContainer = document.getElementById("word-container");
  const startButton = document.getElementById("start-btn");
  const messageElement = document.getElementById("message");
  const timerElement = document.getElementById("timer");
  const roundElement = document.getElementById("round");
  const languageSelect = document.getElementById("language");

  let currentWord = "";
  let guessedLetters = new Set();
  let wrongGuesses = 0;
  let round = 1;
  let timeLeft = 120;
  let timer = null;
  let isPlaying = false;

  const maxWrongGuesses = 6;
  const wordLengths = [5, 10, 15];

  function startGame() {
    round = 1;
    timeLeft = 120;
    isPlaying = true;
    updateTimer();
    startTimer();
    startNewRound();
    startButton.style.display = "none";
    document.querySelectorAll(".keyboard button").forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("correct", "wrong");
    });
  }

  async function startNewRound() {
    wrongGuesses = 0;
    guessedLetters.clear();
    clearCanvas();
    drawBase();
    document.querySelectorAll(".keyboard button").forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("correct", "wrong");
    });

    const wordLength = wordLengths[round - 1];
    const language = languageSelect.value;

    try {
      const response = await fetch(
        `https://random-word-api.herokuapp.com/word?length=${wordLength}&lang=${language}`
      );
      const [word] = await response.json();
      currentWord = word.toUpperCase();
      showWord();
      roundElement.textContent = round;
      messageElement.textContent = "";
    } catch {
      messageElement.textContent = "Error fetching word.";
      endGame(false);
    }
  }

  function makeGuess(letter) {
    if (!isPlaying || guessedLetters.has(letter)) return;

    guessedLetters.add(letter);
    const button = document.querySelector(`button[data-key="${letter}"]`);
    if (currentWord.includes(letter)) {
      if (button) button.classList.add("correct");
    } else {
      wrongGuesses++;
      if (button) button.classList.add("wrong");
      drawHangmanPart();
      if (wrongGuesses >= maxWrongGuesses) {
        endGame(false);
        return;
      }
    }

    showWord();

    if ([...currentWord].every((l) => guessedLetters.has(l))) {
      if (round === 3) {
        endGame(true);
      } else {
        round++;
        setTimeout(startNewRound, 1000);
      }
    }
  }

  function showWord() {
    wordContainer.innerHTML = "";
    for (let letter of currentWord) {
      const div = document.createElement("div");
      div.className = "letter";
      div.textContent = guessedLetters.has(letter) ? letter : "";
      wordContainer.appendChild(div);
    }
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) {
        endGame(false);
      }
    }, 1000);
  }

  function updateTimer() {
    const min = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const sec = (timeLeft % 60).toString().padStart(2, "0");
    timerElement.textContent = `${min}:${sec}`;
  }

  function endGame(won) {
    isPlaying = false;
    clearInterval(timer);
    if (won) {
      messageElement.textContent = "You won!";
      messageElement.className = "message success";
    } else {
      messageElement.textContent = `Game Over! Word: ${currentWord}`;
      messageElement.className = "message error";
      drawHangmanPart(true);
    }
    startButton.style.display = "block";
    startButton.textContent = "Play Again";
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawBase() {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(250, 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(100, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(200, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 80);
    ctx.stroke();
  }

  function drawHangmanPart(complete = false) {
    const parts = [
      () => {
        ctx.beginPath();
        ctx.arc(200, 100, 20, 0, Math.PI * 2);
        ctx.stroke();
      },
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 120);
        ctx.lineTo(200, 180);
        ctx.stroke();
      },
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 140);
        ctx.lineTo(170, 160);
        ctx.stroke();
      },
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 140);
        ctx.lineTo(230, 160);
        ctx.stroke();
      },
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 180);
        ctx.lineTo(170, 210);
        ctx.stroke();
      },
      () => {
        ctx.beginPath();
        ctx.moveTo(200, 180);
        ctx.lineTo(230, 210);
        ctx.stroke();
      },
    ];

    if (complete) {
      parts.forEach((draw) => draw());
    } else {
      const draw = parts[wrongGuesses - 1];
      if (draw) draw();
    }
  }

  // Events
  startButton.addEventListener("click", startGame);

  document.querySelectorAll(".keyboard button").forEach((button) => {
    button.addEventListener("click", () => {
      if (isPlaying) {
        makeGuess(button.dataset.key);
        button.disabled = true;
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (isPlaying) {
      const key = e.key.toUpperCase();
      makeGuess(key);
      const button = document.querySelector(`button[data-key="${key}"]`);
      if (button) button.disabled = true;
    }
  });
});
