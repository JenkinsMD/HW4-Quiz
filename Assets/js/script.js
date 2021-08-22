var wordGuess = document.querySelector(".game-area");
var qBox = document.querySelector(".questionBox");
var startButton = document.querySelector(".start-button");
var resetButton = document.querySelector(".reset-button");
var HSButton = document.querySelector(".highScore-button");
var aList = document.getElementById("aList");
var askQ = document.getElementById("askQ");
var counter = document.querySelector(".counter");
var formDiv = document.getElementById('formArea');
var scoreArray = JSON.parse(localStorage.getItem('scores')) || [];
var formArea = document.getElementById("formArea");
var hsDropdown = document.getElementById("hsDropdown");


var questionList = [
  {
    question: "Which is not a way to declare a variable in JavaScript?",
    choiceA: "var",
    choiceB: "let",
    choiceC: "while",
    choiceD: "const",
    answer: "while",

  },
  {
    question: "Which one is an assignment operator?",
    choiceA: "=",
    choiceB: "==",
    choiceC: "===",
    choiceD: "!==",
    answer: "=",

  },
  {
    question: "Which one shows a valid for loop syntax",
    choiceA: "for (let i = 0, i < 5, i++)",
    choiceB: "for {let i = 0; i < 5; i++}",
    choiceC: "for (i++; i < 5; let i = 0)",
    choiceD: "for (let i = 0; i < 5; i++)",
    answer: "for (let i = 0; i < 5; i++)",

  },
  {
    question: "Which character is used to identify an id",
    choiceA: "$",
    choiceB: "#",
    choiceC: "*",
    choiceD: "&",
    answer: "#",

  },
  {
    question: "Who created JavaScript",
    choiceA: "Brendan Eich",
    choiceB: "Brendon Urie",
    choiceC: "Brendan Fraser",
    choiceD: "Brendon Davies",
    answer: "Brendan Eich",

  }


]


var score=0;
var choice;
var timeLeft;
var i;
var timeInterval;



startButton.addEventListener("click", startQuiz);
resetButton.addEventListener("click", resetQuiz);
HSButton.addEventListener("click", toggleHighScores);


//Starts the quiz, and countdown
function startQuiz () {
  clearContents(); 
  
  

  //Starts the clock
  countdown();
 
  //Get a new question
  getQ(i);
    

}

//Toggle highscore list
function toggleHighScores () {
  setHighScores();
  
  if (hsDropdown.style.display=="block"){
    hsDropdown.style.display= "none";
  } else {
    hsDropdown.style.display="block";
    
  }

}


//Resets the quiz
function resetQuiz (){
  startButton.disabled=true;
  clearContents();

}

//toggles button on or off
function toggleBtn(btn) {
  if(btn.disabled===false){
    btn.style.opacity=.5;
    btn.disabled=true;
  }
  else {
    btn.style.opacity=1;
    btn.disabled=false;
  }
  
 
}

//clears current text content and resets the timer
function clearContents (){
 
  askQ.textContent="";
  aList.textContent="";
  formArea.innerHTML="";
  clearInterval(timeInterval);
  toggleBtn(startButton);
  counter.textContent="";
  i=0;
  score=0;


}


function getQ (i) {

  aList.textContent="";
  askQ.textContent=questionList[i].question;
  

  var li1=document.createElement("li");
  var li2=document.createElement("li");
  var li3=document.createElement("li");
  var li4=document.createElement("li");

  aList.appendChild(li1);
  aList.appendChild(li2);
  aList.appendChild(li3);
  aList.appendChild(li4);


  li1.textContent=questionList[i].choiceA;
  li2.textContent=questionList[i].choiceB;
  li3.textContent=questionList[i].choiceC;
  li4.textContent=questionList[i].choiceD;
  
}

//Choosing an answer, and moving on to the next question
aList.addEventListener("click", function(event) {
  choice = event.target.textContent;

  if(choice ===questionList[i].answer){
    score++;
    
  }else {
    //time penalty for missing a question
    timeLeft= timeLeft-1;
  }

  i++;

  if (i===questionList.length) {
    askQ.textContent="You finished the quiz!\n"+"You answered "+score+" questions correct."
    clearInterval(timeInterval);
    aList.textContent="Do you want to submit your score?";
    counter.textContent = "";
    displayHighscore();
    toggleBtn(startButton);

  } else{
    getQ(i);
  }
});

//Sets a countdown timer
function countdown(){
  timeLeft = 20;

   timeInterval = setInterval(function() {
    if  (timeLeft > 0) {
      counter.textContent = timeLeft;
      timeLeft--;

    } else {
      counter.textContent = "";
      clearInterval(timeInterval);
      askQ.textContent="Times up!\n"+"You answered "+score+" questions correct."
      aList.textContent="Do you want to save your score?";
      displayHighscore();
      toggleBtn(startButton);
    }

     

  }, 1000);
}


//Saves score input by user
function saveScore(event){
  event.preventDefault();
  
  var initials = document.getElementById('initials').value;
  var scoreObj = {
    init: initials,
    score: score
  };

  //Add new score to the array
  scoreArray.push(scoreObj);

  //Sort the array fomr high to low
  scoreArray.sort(function (a, b) {
    return b.score - a.score

  });

  //Trim array to top 5 scores
  
  if (scoreArray.length>4) {
    var tempArray=scoreArray.slice(0,5)
    scoreArray=tempArray;
  }

  //Store array

  localStorage.setItem('scores', JSON.stringify(scoreArray));
 
  resetQuiz();

}


function displayHighscore() {
  var scoreEl =document.createElement('h3');
  scoreEl.textContent=score;
  var form=document.createElement("form");
  form.setAttribute('id', 'formScore')
  var input=document.createElement("input");
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'initials');
  input.textContent = "Enter Initials"
  var submit=document.createElement("input");
  submit.setAttribute("value","Submit");
  submit.setAttribute("type","submit");
  submit.setAttribute("id","submitBtn");
  submit.textContent='Submit Score';

 
  form.append(input, submit);
  formDiv.appendChild(form)
  


  form.addEventListener('submit', saveScore)

  
}

function setHighScores () {
  hsDropdown.textContent="";
for (j=0; j<5;j++){
  if (j<scoreArray.length){
    var hs1=document.createElement("li");
    hs1.textContent=scoreArray[j].init + " , " + scoreArray[j].score
    hsDropdown.appendChild(hs1);
  
  }
 
}




}
