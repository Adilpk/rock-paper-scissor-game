let score1 = JSON.parse(localStorage.getItem('score1')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();
let isAutoplay = false;
let intervalId;
function autoplay(){
  if(!isAutoplay){
    intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000)
    isAutoplay = true
  }
  else{
    clearInterval(intervalId);
    isAutoplay = false;
  } 
}

function playGame(playerMove) {
const computerMove = pickComputerMove();
let result = '';
if (playerMove === 'scissors') {
  if (computerMove === 'rock') {
    result = 'You lose.';
  } else if (computerMove === 'paper') {
    result = 'You win.';
  } else if (computerMove === 'scissors') {
    result = 'Tie.';
  }

} else if (playerMove === 'paper') {
  if (computerMove === 'rock') {
    result = 'You win.';
  } else if (computerMove === 'paper') {
    result = 'Tie.';
  } else if (computerMove === 'scissors') {
    result = 'You lose.';
  }
  
} else if (playerMove === 'rock') {
  if (computerMove === 'rock') {
    result = 'Tie.';
  } else if (computerMove === 'paper') {
    result = 'You lose.';
  } else if (computerMove === 'scissors') {
    result = 'You win.';
  }
}

if (result === 'You win.') {
  score1.wins += 1;
} else if (result === 'You lose.') {
  score1.losses += 1;
} else if (result === 'Tie.') {
  score1.ties += 1;
}
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-score-bord').innerHTML = `You
<img src="thumbnail/${playerMove}-emoji.png" class="img-new">
<img src="thumbnail/${computerMove}-emoji.png" class="img-new">
Computer`;
localStorage.setItem('score1',JSON.stringify(score1));
updateScoreElement();
}

function pickComputerMove() {
const randomNumber = Math.random();
let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1 / 3) {
  computerMove = 'rock';
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
  computerMove = 'paper';
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
  computerMove = 'scissors';
}

return computerMove;
}
function updateScoreElement(){
document.querySelector('.js-score')
.innerHTML = `Wins: ${score1.wins}, Losses: ${score1.losses}, Ties: ${score1.ties}`;
}