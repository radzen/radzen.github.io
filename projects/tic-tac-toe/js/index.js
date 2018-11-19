var board = [0,0,0,0,0,0,0,0,0]; //Each number represents each box. 0 = empty.
var player, cpu; //Global variables that will contain 1 or -1. Used for determining turn.
var gameCount = 0, playerScore = 0, cpuScore = 0; //Score and game count variables
var circle = "&cir;", cross = "&Cross;"; //Images for our shapes

//INITIALIZE:
redraw();
$(window).resize(function() { redraw() });

//GAME START: Show the shape selection screen to the player
shapeSelect("show", "Let's Play");

function redraw() {
  //var height = $(".container").outerHeight();
  var width = $(".container").outerWidth();
  $(".container").css("height",width);
  $(".container").css("width",width);
}

//Function to hide or show our shape select screen
function shapeSelect(option, message) {
  option == "show" ? $(".overlay").show() : $(".overlay").hide();
  if (message !== null) $(".announce").text(message);
}

//Player selects a shape. X = 1, O = -1
$(".select").click(function() {
  var shape = $(this).attr("data-value");
  assignShape(shape); //Assign the shape to player.
  shapeSelect("hide"); //Hides the selection overlay.
  newGame(); //Starts a new game.
});

//Assigns the selected marker.
function assignShape(number) {
  player = number; //Assign the shape's selected value to global player variable.
  cpu = number * -1; //Assign the opposite number to global cpu variable.
}

//New Game function
function newGame() {
  clearBoard(board); //Starts with a clean board.
  gameCount++;
  updateScoreBoard();
  if (player == -1) cpuMove(board, cpu); //If player selects 'O' shape, CPU moves first.
}

function clearBoard() {
  $(".box").html(""); //Remove the background image.
  $(".box").removeAttr("marked",""); //Remove the marked attribute.
  $(".box").removeClass("x"); //Remove the marked attribute.
  $(".box").removeClass("o"); //Remove the marked attribute.
  board = [0,0,0,0,0,0,0,0,0]; //Reset our board to all 0s.
}

function updateScoreBoard(str) {
  if (str == "win") playerScore++;
  if (str == "lose") cpuScore++;
  $(".game-count").text("Game: " + gameCount);
  $(".player-score").text("Player: " + playerScore);
  $(".cpu-score").text("CPU: " + cpuScore);
}

//Player clicks a box
$(".box").click(function() {
  if (currentTurn(board) !== parseInt(player,10)) return;
  //console.log(currentTurn(board), parseInt(player,10));
  var value = $(this).attr("data-value");
  if (isEmpty(value) == false) return //If box is already marked, do nothing.
  placeMarker(value, player); //Place marker on selected box.
  checkBoard(board);  //Check the board if we won or if draw.
  setTimeout(function(){
    cpuMove(board, cpu); //CPU's turn next.
  },400);
});

//Check if box is empty. Returns true or false
function isEmpty(number) {
  var elem = ".b" + number;
  var empty = ($(elem).attr("marked") == undefined) ? true : false;
  return empty;
}

//Place mark on selected box number and checks the board.
function placeMarker(number, turn){
  var elem = ".b" + number; //Our box element starts with the letter b.
  var shape = (turn == 1) ? cross : circle; //Use the corresponding shape based on whose turn it is.
  var color = (turn == 1) ? "x" : "o"; //Use the corresponding shape based on whose turn it is.
  $(elem).addClass(color); //Place our shape image on the box.
  $(elem).html(shape); //Place our shape image on the box.
  $(elem).attr("marked", "true"); //Mark the box so it can't be used unless new game.
  board[number] = parseInt(turn); //Update our board for every turn.
}

//Determine if we have a winner or a draw
function checkBoard(array) {
  if (score(array,0) == 0) gameOver("draw");
  if (score(array,0) == 10) player == 1 ? gameOver("win") : gameOver("lose");
  if (score(array,0) == -10) player == -1 ? gameOver("win") : gameOver("lose");
  return
}

//Show selection screen announcing game outcome.
function gameOver(str) {
  updateScoreBoard(str); //Update the game count|score
  if (str == "draw") shapeSelect("show", "It's a draw");
  if (str == "win") shapeSelect("show", "Player wins!");
  if (str == "lose") shapeSelect("show", "CPU wins!");

}


//AI FUNCTIONS

//Describe our game object
var tictactoe = function(array) {
  this.board = array;
  this.state = array;
  this.moves = getAvailableMoves(array);
  this.depth = 0;
  this.over = (score(array, 0)) ? true : (this.moves.length == 0) ? true : false;
  this.scoreList = [];
  this.moveList = [];
}

//Calls minimax to determine the best move
function cpuMove(array, turn) {
  var movesLeft = getAvailableMoves(array);

  //opening move
  if (turn == 1 && movesLeft.length >= 7) {
    var arr = [0,2,4,6,8];
    var newArr = [];
    for (i in arr) {
      if (array[arr[i]] == 0) newArr.push(arr[i]);
    }
    var n = Math.floor(Math.random() * newArr.length);
    //console.log(arr[n], newArr, array)
    placeMarker(newArr[n], turn);
    return
  }

  if (movesLeft.length >= 8) {
    if (isEmpty(4)) {
      placeMarker(4, turn);
      return
    }
    if (!isEmpty(4)) {
      var arr = [0,2,6,8];
      var n = Math.floor(Math.random() * arr.length);
      placeMarker(arr[n], turn);
      return
    }
  }

  var game = new tictactoe(array);
  minimax(game, -Infinity, Infinity);
  //console.log(game.scoreList, game.moveList, bestMove(game, turn));
  placeMarker(bestMove(game, turn), turn);
  checkBoard(board);
}

//Get available moves by getting the index of 0s.
function getAvailableMoves(array) {
  var moves = []; //Create our moves array.
  for (i in array) {
    if (array[i] == 0) moves.push(parseInt(i)); //fill our moves array.
  }
  return moves;
}

//Returns 10 on win, -10 on lose or 0 if draw.
function score(arr, depth) {
  var min = 0;
  var max = 0;
  var combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  for (combo in combos) {
    for (i in combos[combo]) {
      if (arr[combos[combo][i]] == 1) max++;
      if (arr[combos[combo][i]] == -1) min++;
    }
    if (max == 3) return 10 - depth;
    if (min == 3) return depth - 10;
    max = 0;
    min = 0;
  }
  if (getAvailableMoves(arr).length == 0) return 0;
}

//Determine who's turn it is to play.
function currentTurn(array) {
  var min=0, max=0, turn;
  for (i in array) {
    if (array[i] == -1) min++;
    if (array[i] == 1) max++;
  }
  return turn = (max <= min) ? 1 : -1;
}

//Minimax algorithm
function minimax(obj, alpha, beta) {
  if (obj.over) return score(obj.board, obj.depth); //return score on game over.
  obj.depth++; //increase depth on each call. Used for deducting score.
  var scores=[]; //stores our scores.
  var moves=[]; //stores our moves.

  obj.moves.forEach(function(move){ //try every single move possible.
    obj.board = obj.state.slice(0); //for each move, create a new copy of the board.
    obj.board[move] = currentTurn(obj.board); //alternate players depending on board status.
    var possibleGame = new tictactoe(obj.board); //create a new instance of our object.
    possibleGame.depth = obj.depth; //inherit the depth from the previous object.
    scores.push(minimax(possibleGame)); //call minimax on the object instance and push the result to scores array.
    moves.push(move); //store each move to moves array.
  });

  obj.moveList = moves; //store all moves to our object.
  obj.scoreList = scores;//store all scores to our object.

  if (currentTurn(obj.board) == -1) {
    return Math.max.apply(Math, scores); //returns max number in scores array.
  } else {
    return Math.min.apply(Math, scores); //returns min number in scores array.
  }
}

//Returns a number that corresponds to the best move
function bestMove(obj, turn) {
  var scoreIndex;
  if (turn == 1) scoreIndex = obj.scoreList.indexOf(Math.max.apply(Math, obj.scoreList)); //Get max score index
  if (turn == -1) scoreIndex = obj.scoreList.indexOf(Math.min.apply(Math, obj.scoreList)); //Get min score index
  return obj.moveList[scoreIndex]; //return our max|min index from the moves list.
}
