// questions with the answers 
var questions = [
    {
      title: 'How do you create a new file on the command line',
      choices: ['mkdir', 'touch', 'cd', 'add'],
      answer: 'touch',
    },
    {
      title: 'An array is enclosed with ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets (brace)'],
      answer: 'square brackets (brace)',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'What command takes you back to the parent directory on command line',
      choices: ['cd .', 'cd', 'cd ..', 'cd ./'],
      answer: 'cd ..',
    },
    {
      title:
        'What git command creates a new branch and switches to it?',
      choices: ['git push origin main', 'git pull origin main', 'git add -A', 'git checkout -b <branch name>'],
      answer: 'git checkout -b <branch name>',
    },
  ];

  // There will be a starting time of 1 minute based on # of questions
var currentQuestionIndex = 0;
var time = questions.length * 12; //5 questions needed for this setup
var timerId;
// console.log(time)
// console.log(timerId)
// DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
console.log(feedbackEl)
console.log(initialsEl)
console.log(startBtn)
console.log(submitBtn)
console.log(choicesEl)
console.log(timerEl)
console.log(questionsEl)

function startQuiz() {
    var startScreenEl1 = document.getElementById('start-screen')
    startScreenEl1.setAttribute ('class','hide'); //hide start screen 

    questionsEl.removeAttribute('class'); //unhide start screen

    timerId = setInterval(clockTick, 1000); // start timer

    timerEl.textContent = time; //show starting time

    getQuestion();
}
function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title with current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = '';
  
    // loop over choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      // create new button for each choice
      var choice = currentQuestion.choices[i];
      var choiceNode = document.createElement('button');
      choiceNode.setAttribute('class', 'choice');
      choiceNode.setAttribute('value', choice);
  
      choiceNode.textContent = i + 1 + '. ' + choice;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    }
  }
  function questionClick(event) {
    var buttonEl = event.target;
  var answerChoice = $("#feedback")
    // if the clicked element is not a choice button, do nothing.
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
    // check if user guessed wrong
    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 12;
  
      if (time < 0) {
        time = 0;
      }
      // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = 'Wrong!';
    answerChoice.style.color= "red"
  } else {

    feedbackEl.textContent = 'Correct!';
    answerChoice.style.color= "green"
  }
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 5000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  // show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute('class', 'hide');
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
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = '../scores/highscores.html';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
