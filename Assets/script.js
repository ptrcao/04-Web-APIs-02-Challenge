function question_advancer(index){

}

// A string of objects is the best approach
mc_question_array = [
  {
    question: "Javascript is a/an _______ language?",
    options: [
      "Object_Oriented",
      "Object-Based",
      "Procedural",
      "None of the above",
    ],
    correctAnsIndex: 1,
  },
  {
    question: "Commonly used data types do NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    correctAnsIndex: 2,
  },
  {
    question: "Arrays in Javascript can be used to store ____:",
    options: [
      "It is an ordered list of values",
      "It is an ordered list of objects",
      "It is an ordered list of strings",
      "It is an ordered list of functions",
    ],
    correctAnsIndex: 0,
  },
  {
    question:
      "Strings must be enclosed with ____ when being assigned to variables:",
    options: ["commas", "curly braces", "quotes", "parentheses"],
    correctAnsIndex: 2,
  },
];

// Avoid this bad practice of "consecutively" numbered variables, as it will be hard to iterate through the options later, esp. as Javascript doesnt support variable variables and then you have no nice way to iterate through the options
// {
//     question : "Strings must be enclosed with ____ when being assigned to variables:",
//     option1 : "commas",
//     option2 : "curly braces",
//     option3 : "quotes",
//     option4 : "parentheses",
//     correctAnsIndex : 1,
// },
// Collapse it into an array instead:
// {
//     question : "Javascript is a/an _______ language?",
//     options : ["Object_Oriented", "Object-Based", "Procedural", "None of the above"]
//     correctAnsIndex : 1,
// },
// https://stackoverflow.com/a/5187652/9095603

// Then you can do: mc_question_array[0].correctAnsIndex, etc.
// dot notation
// JS objects

// console.log(q_slot)
// console.log(mc_question_array[0][0])

// VARIABLES
var timerInterval;

// var secondsLeft = 10000;
var secondsLeft = 0;
var index = 0;


console.log("Index: ", index);
var questionNumber = index + 1;

var questionLabel = "Q" + questionNumber;
console.log(questionLabel)


var timer = document.getElementById("timer");

timer.textContent = "Time remaining: " + secondsLeft;

// BUTTONS
var startBtn = document.getElementById("start-btn");
var playAgainBtn = document.getElementById("play-again");
var submitBtn = $("#player-initials-submit"); // Does this require var?

// CARDS
var startBox = document.getElementById("start-box");
var quizBox = document.getElementById("quiz-box");
var endBox = document.getElementById("end-box");
var hsBox = document.getElementById("highscores-box");
var resultBox = document.getElementsByClassName("result")[0];
var numQues = mc_question_array.length;
console.log("numQues: " + numQues);

var questions_parent_container = $("#qs_parent_container");
// The Dollar Shorthand
// https://www.codingem.com/javascript-dollar-sign/#:~:text=To%20add%20code%20inside%20a,sign%20to%20make%20something%20work.
// document.getElementById("age")
// This function call takes time to write and is pretty verbose. Thus, a common convention is to replace the document.getElementById() function with $().



// EVENT LISTENERS

// Attach event listener to increment button element
submitBtn.on("click", function (event) {
    event.preventDefault();
    // without event.preventDefault(); the entire app will be reloaded on form/input submission
  // Don't mix JQuery and Javascript:
  // TypeError: $(...).addEventListener is not a function
  // https://stackoverflow.com/a/34767762/9095603

  // // Get any prev stored highscores
  // var storedHighScores = JSON.parse(localStorage.getItem("player_scoreboard_info")); // WILL THIS THROW ERROR IF key does not exist in localStorage??

  // // If todos were retrieved from localStorage, update the todos array to it
  // if (storedHighScores !== null) {
  //     player_scoreboard_info = storedHighScores;
  //     console.log('Retrieved: ' + player_scoreboard_info)
  // }


  


  // INPUTS
  var playerInput = $("#player-initials").val(); // Does this require var?
  console.log("playerInput: " + playerInput);

    if (playerInput == null || playerInput == ''){
    alert('Invalid input.  You must enter your initials.  Please try again.')
    }
    else{
        appendToStorage(playerInput);

        // var enteredInitials = playerInput.val();
        // console.log(enteredInitials)

        // // Javascript Add to Object: Insert Key/Value in JavaScript Object
        // // https://askjavascript.com/javascript-add-to-object/
        // player_scoreboard_info.playerInitials = enteredInitials.trim()
        // player_scoreboard_info.playerScore = secondsLeft

        // localStorage.setItem("player_scoreboard_info", JSON.stringify(player_scoreboard_info));

        showHighScores();
    }
});

var userScoreList = [];
function appendToStorage(playerName) {
  console.log("***********************************Inside appendtostorage");
  userScoreList =
    JSON.parse(localStorage.getItem("player_scoreboard_info")) || [];
  console.log(userScoreList);
  var current_player_info = {
    playerName: playerName,
    playerScore: secondsLeft,
  };
  console.log(current_player_info);
  userScoreList.push(current_player_info);

  localStorage.setItem("player_scoreboard_info", JSON.stringify(userScoreList));
}

startBtn.addEventListener("click", startQuiz);



playAgainBtn.addEventListener("click", () => {
  startQuiz();
});

// playAgainBtn.addEventListener("click", () => {
//     startQuiz();
//   });
// multiple functions on add event listener
// https://stackoverflow.com/a/55943180/9095603

console.log(startBox);
console.log(quizBox);
console.log(endBox);
console.log(hsBox);
console.log(resultBox);



// Event delegation: a way that you can ad an event listener once for multiple elements with support for adding extra children
// https://www.youtube.com/watch?v=pKzf80F3O0U&ab_channel=dcode
questions_parent_container.on("click", "label", 

function click_fn(event) {

    numQues--;
 
    
    console.log(index)

    console.log("click");
    var clickedAns = event.target.textContent;
    console.log(event.target.textContent);

    // This turns out to be the JQuery approach, what would the pure JS approach be?
    // https://stackoverflow.com/a/37887261/9095603

    console.log("Clicked Ans: " + clickedAns);
    console.log(
      "Correct Ans: " +
        mc_question_array[index].options[
          mc_question_array[index].correctAnsIndex
        ]
    );

    if (
      clickedAns ==
      mc_question_array[index].options[mc_question_array[index].correctAnsIndex]
    ) {
      console.log("Correct!");
      result = "<li>" + questionLabel + ": Correct!</li>";

      $("#result").html(result);

    //   if (numQues) {
    
    //     showQuestion(index + 1);
    //   } else {
    //     stopQuiz();
    //   }
    } else {
      console.log("Incorrect!");
      result =
        "<li>" +
        questionLabel +
        ': Wrong! <span style="color:red;font-style:italic;">-10 secs<span></li>';
      $("#result").html(result);
      console.log("Before: ", secondsLeft);
      secondsLeft -= 10;
      console.log("After: ", secondsLeft);
      // Subtraction assignment (-=)
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction_assignment

    //   if (numQues) {
    
    //     showQuestion(index + 1);
    //   } else {
    //     stopQuiz();
    //   }
    }

    // Now that the answer-checking has been done, advance to the next question
    index++;
 

    if (numQues) {
        showQuestion(index);
      } else {
        stopQuiz();
      }
  }

);


function startQuiz() {
  secondsLeft = 10000;
  // var secondsLeft = 10000;
  // wrong, is creating a new variable named secondsLeft which is only accessible inside this StartQuiz function
  // the showQuestion function was pulling the global variable named SecondsLeft which = 0

  index = 0;
  numQues = mc_question_array.length;

  // Sets interval in variable
  startBox.style.setProperty("display", "none");
  quizBox.style.setProperty("display", "block");
  hsBox.style.setProperty("display", "none");

  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time remaining: " + secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      stopQuiz();
    }
  }, 1000);

  showQuestion(index);
}



// document
//   .getElementById("player-initials-submit")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     var playerInitials = document.getElementById("player-initials").value; // .trim() doesn't work here?
//     console.log(secondsLeft);
//     console.log(playerInitials);
//   });

function showQuestion(index) {
  
  console.log("No of ques left ", numQues);

  console.log("Index: ", index);
  questionNumber = index + 1;

 

  questionLabel = "Q" + questionNumber;
  console.log(questionLabel)


  var q_slot = document.getElementById("mc-question");

  // Dynamically generate the question label and question
  q_slot.textContent = questionLabel + " " + mc_question_array[index].question;

  var a_slots = document.querySelectorAll("label");
  console.log(a_slots);

  var optionDivs = document.getElementsByClassName("label");
  console.log(optionDivs);

  // Dynamically generate options
  for (var i = 0; i <= 3; i++) {
    // for each answer
    a_slots[i].textContent = mc_question_array[index]["options"][i];
  }




}

function stopQuiz() {
  clearInterval(timerInterval);
  quizBox.style.setProperty("display", "none");
  endBox.style.setProperty("display", "block");
}



function showHighScores() {

  endBox.style.setProperty("display", "none");
  hsBox.style.setProperty("display", "block");
  resultBox.style.setProperty("display", "none");

  const hsTable = document.getElementsByTagName("table")[0]
  console.log(hsTable);
//   hsTable.appendChild('row')

//   console.log('table element: ' + hsBox.closest('table'))
  

  retrievedScores = JSON.parse(localStorage.getItem("player_scoreboard_info")) || [];
  console.log("retrievedScores" + retrievedScores)
  console.log(JSON.stringify(retrievedScores, null, 4));

    tableContents = '';
  for (var key in retrievedScores){
    if (retrievedScores.hasOwnProperty(key)){
    tableContents += '<row><td>' + key + '</td><td>' + retrievedScores[key] + '</td></row>';
    }
  }
  console.log(tableContents);
  hsTable.innerHTML = tableContents;

  // localStorage.setItem("studentGrade", JSON.stringify(studentGrade));

  // var playerInfo = {
  //     student: student.value,
  //     grade: grade.value,
  //     comment: comment.value.trim()
  //   };

  // var scores = JSON.parse(localStorage.getItem("player_scoreboard_info"));
  // console.log(scores);

  // Clear out the last multiple choice result
  $("#result").html("");
}

// BUGS
// Timer display multiple events acting on it when a new game is started
// secondsLeft in storage is -140

// Stop a setInterval() from within another function
// Store a reference to the interval and clear it using clearInterval()
// https://stackoverflow.com/a/22316108/9095603

// the second iteration is broken, if the player plays again, it only shows one question before ending the quiz

// Score isn't being deducted

// Trim doesn't work when the variable is originally got?
