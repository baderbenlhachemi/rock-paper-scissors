let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function playGame(move) {
  let usersMove = move;
  let computerMove = randomMove();
  duel(usersMove, computerMove);
}

function randomMove() {
  const randomNumber = Math.random();
  let move;

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    move = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    move = "paper";
  } else {
    move = "scissors";
  }

  return move;
}

function duel(usersMove, computerMove) {
  const winningMoves = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  const resultElement = document.querySelector(".js-result");
  const movesElement = document.querySelector(".js-moves");

  if (usersMove === computerMove) {
    score.ties++;
    resultElement.innerHTML = 'It\'s a tie <i class="bi bi-emoji-neutral"></i>';
    movesElement.innerHTML = `You
        <img src="assets/img/${usersMove}-emoji.png" class="move-icon">
        <img src="assets/img/${computerMove}-emoji.png" class="move-icon">
        Computer`;
  } else if (winningMoves[usersMove] === computerMove) {
    score.wins++;
    resultElement.innerHTML = 'You Win <i class="bi bi-emoji-smile"></i>';
    movesElement.innerHTML = `You
        <img src="assets/img/${usersMove}-emoji.png" class="move-icon">
        <img src="assets/img/${computerMove}-emoji.png" class="move-icon">
        Computer`;
  } else {
    score.losses++;
    resultElement.innerHTML = 'Computer Wins <i class="bi bi-emoji-frown"></i>';
    movesElement.innerHTML = `You
        <img src="assets/img/${usersMove}-emoji.png" class="move-icon">
        <img src="assets/img/${computerMove}-emoji.png" class="move-icon">
        Computer`;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
}

function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem("score");

  updateScoreElement();
}

function updateScoreElement() {
  const scoreElement = document.querySelector(".js-score");

  scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

updateScoreElement();
