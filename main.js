// Array Of Words
const allWords = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];
let inputField = document.querySelector(".input");
let startButton = document.querySelector(".start");
let upcomingWords = document.querySelector(".upcoming-words");
let theWord = document.querySelector(".the-word");
let currentWord = "";
let randomIndex = "";
let timer = 0;
let levelSpan = document.querySelector(".lvl");
let timeLeft = document.querySelector(".control .time span");
let gotScore = document.querySelector(".score .got");
let totalScore = document.querySelector(".score .total");
let finishGame = document.querySelector(".finish");

// set start playing
startButton.addEventListener("click",()=>{
  // removing start button
  startButton.remove();
  playSetting();
  startPlay();
  inputField.focus();
  // setting start for each word
  let start = setInterval(()=>{
    timeLeft.innerHTML--
    if(timeLeft.innerHTML == 0) {
      // comparing the written word with current word
      if(inputField.value.toLowerCase() == currentWord.toLowerCase()) {
        gotScore.innerHTML++;
        if(words.length > 0) {
          startPlay()
          
        } else {
          passgame();
          lastResult();
          clearInterval(start);
        }
        
      } else {
        gameOver()
        lastResult();
        clearInterval(start);
      }
    }
  },1000)
})

// set timer
// set game setting 
function playSetting() {
  // prevent paste on input field
  inputField.onpaste = ()=>{
    return false;
  }
  // set game level
  let levelPlaying = document.querySelector("#level").value;
  switch(levelPlaying) {
    case "easy":
      timer = 6;
      // choosing words that match the game level
      words = allWords.filter((word)=>{
        return word.length <= 5;
      })
      break;
    case "normal":
      timer = 4;
      words = allWords.filter((word)=>{
        return word.length <= 7;
      })
      break;
    case "hard":
      timer = 2;
      words = allWords
      break;
  }
  levelSpan.innerHTML = levelPlaying;
  document.querySelector(".level-choosing").remove();
  // set the message (information about level game)
  document.querySelector(".message .seconds").innerHTML = timer;
  document.querySelector(".message").style.display = "block";
  // set total score
  totalScore.innerHTML = words.length;
}

// set the word and upcoming words and display them on page
function startPlay() {
  // reset input field
  inputField.value = ""
  // reset upcoming words
  upcomingWords.innerHTML = "";
  // set timer
  gotScore.innerHTML == 0 ?timeLeft.innerHTML = timer + 3:timeLeft.innerHTML = timer;
  // get random word
  randomIndex = Math.floor(words.length * Math.random());
  // store the word in variable
  currentWord = words[randomIndex];
  // display it in page 
  theWord.innerHTML = currentWord;
  // delet current word from our list
  words.splice(randomIndex,1);
  // display upcoming words
  words.forEach((word) =>{
    // choosing words that match the game level
    let span = document.createElement("span");
    span.append(word);
    upcomingWords.append(span);
  })
}

function passgame() {
  finishGame.innerHTML = "congratulations";
  finishGame.style.color = "var(--main-color)";
}
function gameOver() {
  finishGame.innerHTML = "game over";
  finishGame.style.color = "indianred";

}

//store last result in local storage and display it in finish message
function lastResult() {
  let div = document.createElement("div");
  div.append(`your last result Is: ${window.localStorage["last-result"] || 0}`);
  finishGame.append(div);
  window.localStorage.setItem("last-result",gotScore.innerHTML);
}