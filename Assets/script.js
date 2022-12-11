// FUNCTIONS FOR LATER USE
// sorting function to sort high scores table by ascending order of score in the second col
// Adapted from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table_number
function sortTable(table) {
    var rows, switching, i, x, y, shouldSwitch;

    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        //check if the two rows should switch place:
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
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



playAgainBtn.addEventListener("click", function(event){
    event.preventDefault(); // for debugging and troubleshooting, this is helpful as it doesn't cause the page and console to reload and you can retain your console data up to this point, even though reloading the page at this point happens to coincide with what you want

   // Clear high scores table for next run it doesn't duplicate rows over the last run (it will be rebuilt from scratch again)
    //    var existingTable = document.getElementsByTagName("table")[0];
    //    existingTable.append("table")

    //     document.getElementsByTagName("table")[0].remove();
    // https://www.geeksforgeeks.org/how-to-remove-all-rows-from-a-table-in-javascript/#:~:text=This%20can%20be%20done%20by%20using%20JavaScript.&text=First%20of%20all%20set%20the,delete%20the%20all%20table%20rows.
    // this approach may not work because the whole ??? table element gets removed, and you want to keep the table element whilst removing the rows
    
    // console.log(document.getElementsByTagName("table"));
    document.getElementsByTagName("table")[0].innerHTML = "";
    // https://stackoverflow.com/a/41413953/9095603

    // table = document.getElementsByTagName("table");
    // while(table.rows.length > 0) {
    //     table.deleteRow(0);
    //   }
    // https://stackoverflow.com/a/16258678/9095603


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

document.getElementById("view-scores").addEventListener("click",function(){
    showHighScores();
})

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
      result = "<li>(Prev) " + questionLabel + ": Correct!</li>";

      $("#result").html(result);


    } else {
      console.log("Incorrect!");
      result =
        "<li>(Prev) " +
        questionLabel +
        ': Wrong! <span style="color:red;font-style:italic;">-10 secs<span></li>';
      $("#result").html(result);
      console.log("Before: ", secondsLeft);
      secondsLeft -= 10;
      console.log("After: ", secondsLeft);
      // Subtraction assignment (-=)
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction_assignment

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
  secondsLeft = 120;
  // var secondsLeft = 10000;
  // wrong, is creating a new variable named secondsLeft which is only accessible inside this StartQuiz function
  // the showQuestion function was pulling the global variable named SecondsLeft which = 0

  index = 0;
  numQues = mc_question_array.length;

  // Sets interval in variable
  startBox.style.setProperty("display", "none");
  quizBox.style.setProperty("display", "block");
  hsBox.style.setProperty("display", "none");
  resultBox.style.setProperty("display", "block");

  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time remaining: " + secondsLeft;

    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
    //<= rather than == is important because negative timer is possible when user gets penalised -10s below a remaining time of 10s
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
    // For View high scores transition
    clearInterval(timerInterval);
    secondsLeft = 0;
    timer.textContent = "Time remaining: " + secondsLeft;
    startBox.style.setProperty("display", "none");
    quizBox.style.setProperty("display", "none");
    document.getElementById("view-scores").style.setProperty("display", "none");

    // for stopQuiz transition
  endBox.style.setProperty("display", "none");
  hsBox.style.setProperty("display", "block");
  resultBox.style.setProperty("display", "none");



  var table = document.getElementsByTagName("table")[0]
  console.log(table);


  retrievedScores = JSON.parse(localStorage.getItem("player_scoreboard_info")) || [];
  console.log("retrievedScores" + retrievedScores)
//   console.log(JSON.stringify(retrievedScores, null, 4));


// Insert headers
// Table insertRow() Method
// https://www.w3schools.com/jsref/met_table_insertrow.asp
var row = table.insertRow(0);

var cell1 = row.insertCell(0)
var cell2 = row.insertCell(1)

cell1.innerHTML = 'Player';
cell2.innerHTML = 'Score';


retrievedScores.forEach(function (arrayItem) {

    // Table insertRow() Method
    // https://www.w3schools.com/jsref/met_table_insertrow.asp
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = arrayItem.playerName;
    cell2.innerHTML = arrayItem.playerScore;
    // https://stackoverflow.com/a/63931711/9095603
   
});

sortTable(table);

  // Clear out the last multiple choice result
  $("#result").html("");
}



// Stop a setInterval() from within another function
// Store a reference to the interval and clear it using clearInterval()
// https://stackoverflow.com/a/22316108/9095603
