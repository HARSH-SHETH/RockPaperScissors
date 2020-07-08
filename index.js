var rules = document.querySelector("#rules span");
var rulesCard = document.querySelector("#rules-card-bg");
var rockPaperScissors = ["rock", "paper", "scissors"];
var userPick = document.querySelectorAll("#main-game div");
var colors = ["hsl(349, 71%, 52%)", "hsl(230, 89%, 62%)", "hsl(39, 89%, 49%)"];
var score = 0;

initiate();

function initiate(){
  gamePlay();
  showRules();
} 
// SHOW RULE BOARD
function showRules(){
  rules.addEventListener("click", function(){
    rulesCard.style.display = "block";
  });
  cancelRules();
}
// SET THE DISPLAY OF RULE BOARD TO NONE
function cancelRules(){
  var remove = document.querySelector("img[src*=\"close\"]");
  remove.addEventListener("click", function(){
    rulesCard.style.display = "none";
  });
}
// GAME PLAY 
function gamePlay(){
  for(var i = 0; i < 3; i++){
    userPick[i].addEventListener("click", function(){
      var index = Math.floor(Math.random() * 3);
      var housePickSymbol = rockPaperScissors[index];
      var userPickSymbol  = this.getAttribute("data-role");
      // HIDE THE MAIN GAME 
      document.querySelector("#main-game").style.display = "none";
      displayChoices(userPickSymbol, housePickSymbol);
    });
  }
}
// DISPLAY THE CHOICES OF USER AND MACHINE
function displayChoices(userPickSymbol, housePickSymbol){
      user = userPickSymbol;
      house = housePickSymbol;
      housePickSymbol = document.querySelector("#" + housePickSymbol).cloneNode(true);
      userPickSymbol  = document.querySelector("#" + userPickSymbol).cloneNode(true);
      var newSection = document.createElement("section");
      document.body.appendChild(newSection);
      newSection.classList.add("newSection");
      newSection.innerHTML = "<div><h1>You Picked</h1>" + userPickSymbol.outerHTML + "</div>" 
        + "<div><h1>The House Picked</h1>" +housePickSymbol.outerHTML + "</div>";
      document.body.insertAdjacentElement("beforeEnd", document.querySelector("#rules"));
      decideWinner(user, house);
}
// DECIDE WHO IS THE WINNER ACCORDING TO GAME-RULES
function decideWinner(user, house){
  var userIndex = rockPaperScissors.indexOf(user);
  var houseIndex = rockPaperScissors.indexOf(house);
  var textMsg = "";
  var winner = user;
  if(userIndex - houseIndex == 0){
    textMsg = "DRAW";
  }
  else if(userIndex - houseIndex == 1 || userIndex - houseIndex == -2){
    textMsg = "YOU WIN";
    score++;
    if(score < 10)
      document.querySelector("#score").textContent = "0" + score;
    else
      document.querySelector("#score").textContent = score;
  }
  else{
    textMsg = "YOU LOSE";
    winner = house;
  }
  var newSection = document.querySelector(".newSection");
  newSection.style.width = "70%";
  var firstDiv = document.querySelectorAll(".newSection div")[0];
  firstDiv.outerHTML += "<div id=\"msg\"><h1>" + textMsg + "</h1><button>PLAY AGAIN</button></div>";
  // DISPLAY PLAY AGAIN BUTTON IN WINNING SYMBOL COLOUR
  document.querySelector(".newSection button").style.color = colors[rockPaperScissors.indexOf(winner)];
  // UPDATE THE SCORE BOARD 
  playAgain(); 
}
function playAgain(){
  var playButton = document.querySelector(".newSection button");
  playButton.addEventListener("click", function(){
    document.querySelector(".newSection").remove();
    document.querySelector("#main-game").style.display = "block";
  });
}
