var startBtn=document.getElementById('start-btn');
var questionbtn=document.getElementById('questions');
var startbtn=document.getElementById('start-btn') 
startBtn.addEventListener('click',()=>{
  questionbtn.classList.remove('hide')
  startBtn.classList.add('hide')
 var i = 21;

(function timer(){
    if (--i < 0)
    alert('Game Over');
    setTimeout(function(){
        document.getElementById('timer').innerHTML = i + ' secs';
        timer();
    }, 1000);
})();

})
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


function populate() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      // handle question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;

      // creat answers 
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      populate();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
  new Question("Capital of Iraq", ["Baghdad", "basrah","arbil", "mousl"], "baghdad"),
  new Question("5+3?", ["8", "10", "33", "55"], "8"),
  new Question("100divided by 2?", ["50", "25","75", "5"], "50"),
  new Question("240divided by 10", ["24", "10", "26", "All"], "24"),
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();

