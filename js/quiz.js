// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var score = 0;
var questionCounter = 0;

// variables to reference DOM elements
var questionSectionEl = document.getElementById("questionSection"); //show and hide
var timerEl = document.getElementById("time");
var optionEl = document.getElementById("options");  //options from questions array
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials"); //get user initials
var showAnswerEl = document.getElementById("showAnswer");
var showScoreEl = document.getElementById("score");
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');

// sound effects
var sfxWin = new Audio("./assets/sounds/win.wav");
var sfxLose = new Audio("./assets/sounds/lose.wav");

function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("quizSection");
  startScreenEl.setAttribute("class", "hide");
  // un-hide questions section
  questionSectionEl.removeAttribute("class");
  // start timer
  timerId = setInterval(clockTick, 1000);
  // show starting time
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  // update currentQuestion with current question from array
  var currQuestionEl = document.getElementById("currQuestion");
  //
  currQuestionEl.textContent = currentQuestion.qtn;
  questionCounter++;
  progressText.innerHTML =`Question ${questionCounter} of ${questions.length}`;
  progressBarFull.style.width = `${(questionCounter/questions.length * 100)}%`;
  // clear old options
  optionEl.innerHTML = "";
  // loop over options
  currentQuestion.opt.forEach(function(option, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "options");
    choiceNode.setAttribute("value", option);
    choiceNode.textContent = (currentQuestion.btn[i]);
    //
    var descNode = document.createElement('p');
    descNode.setAttribute("class", "options p");
    descNode.textContent = (currentQuestion.opt[i].charAt(0).toUpperCase() + currentQuestion.opt[i].slice(1));
    // attach click event listener to each choice
    choiceNode.onclick = questionClick;
    // display on the page
    optionEl.appendChild(choiceNode);
    optionEl.appendChild(descNode);
    i ++ ;
  });
}  //end getQuestion

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].ans) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;

    // play sound effect
    sfxLose.play();
    score = score - 5;
    showAnswerEl.textContent = "Wrong! Answer is (" + questions[currentQuestionIndex].ans + ")" ;
    showAnswerEl.setAttribute("class", "showincorrect");
    showScoreEl.textContent = score;
  } else {
    // play sound effect
    sfxWin.play();
    score = score + 10;
    showAnswerEl.textContent = "Correct (" + questions[currentQuestionIndex].ans +")";
    showAnswerEl.setAttribute("class", "showcorrect");
    showScoreEl.textContent = score;
  }
  //
  setTimeout(function() {
    showAnswerEl.setAttribute("class", "showcorrect  showincorrect hide");}, 1000);
  // move to next question
  currentQuestionIndex++;
  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("endSection");
  endScreenEl.removeAttribute("class");
  endScreenEl.setAttribute("class" , "quiz");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = score;

  // hide questions section
  questionSectionEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var errMsgEl = document.getElementById("err"); 
  document.getElementById("initials").required = true;
 
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: score,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
  else {
      errMsgEl.removeAttribute("class");
      errMsgEl.innerHTML = "Please Enter Your Initials!";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
