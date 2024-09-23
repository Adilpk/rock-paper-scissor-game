let score1 = JSON.parse(localStorage.getItem('score1')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
document.querySelector('.js-reset-btn').addEventListener('click',()=>{
  showrestbutton();
});
updateScoreElement();
let isAutoplay = false;
let intervalId;
document.querySelector('.js-autoplay').addEventListener('click',()=>{
  autoplay();
});
function resertScore(){
  score1.wins = 0;
  score1.losses = 0;
  score1.ties = 0;
  localStorage.removeItem('score1');
  updateScoreElement();
}
function showrestbutton(){
  document.querySelector('.js-reset-btn-conformation').innerHTML = `
  are you sure want to reset score
  <button class="main-btn js-reset-cnfrm-yes">Yes</button>
  <button class="main-btn js-reset-cnfrm-no">No</button>
  `;
  document.querySelector('.js-reset-cnfrm-yes').addEventListener('click',()=>{
    resertScore();
    hideResetButton();
  });
  document.querySelector('.js-reset-cnfrm-no').addEventListener('click',()=>{
    hideResetButton();
  })
}
function hideResetButton(){
  document.querySelector('.js-reset-btn-conformation').innerHTML = '';
}
function autoplay(){
  if(!isAutoplay){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000)
    isAutoplay = true
    document.querySelector('.auto-play-btn').innerHTML = 'Stop';
  }
  else{
    clearInterval(intervalId);
    isAutoplay = false;
    document.querySelector('.auto-play-btn').innerHTML = 'Auto Play';
  } 
}
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock')
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper')
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors')
});
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
});
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
// it show the resutls images on the screen
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-score-bord').innerHTML = `You
<img src="thumbnail/${playerMove}-emoji.png" class="img-new">
<img src="thumbnail/${computerMove}-emoji.png" class="img-new">
Computer`;
localStorage.setItem('score1',JSON.stringify(score1));
updateScoreElement();
}
// this function pick the computer side moves and the computer choose its value by using 'math.random'
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
// this function will update screen scorecard 
function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score1.wins}, Losses: ${score1.losses}, Ties: ${score1.ties}`;
}
// press the 'A' key in the keyboard the game will change into 'autoplay' mode
document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'a'){
    autoplay();
  }
});
// press the backspace key then the game score will reset it set by using key
document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'Backspace'){
    resertScore();
  }
});