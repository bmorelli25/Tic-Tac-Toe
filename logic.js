$(document).ready(function() {
  $(".white").click(function() {
    $(".box, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    aiCo = "#333";
    huCo = "white";
    console.log("white");
  });
  $(".grey").click(function() {
    $(".box, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    console.log("black");
  });

  $("td").click(function() {
    move(this, huPlayer, huCo);
    console.log("clicked");
  });
});
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//var huPlayer = "P";
//var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "white";
var huCo = "#333";

function move(element, player, color) {
  console.log("element"+ element.id);
  if (board[element.id] != "P" && board[element.id] != "C") {
    round++;
    $(element).css("background-color", color);
    board[element.id] = player;
    console.log(board);

    if (winning(board, player)) {
      setTimeout(function() {
        alert("YOU WIN");
        reset();
      }, 500);
      return;
    } else if (round > 8) {
      setTimeout(function() {
        alert("TIE");
        reset();
      }, 500);
      return;
    } else {
      round++;
      var index = play(board, aiPlayer).index;
      console.log("Index: ", index);
      var selector = "#" + index;
      $(selector).css("background-color", aiCo);
      board[index] = aiPlayer;
      console.log("Board: ", board);
      console.log("Index Clicked: ", index);
      console.log("FC: ", fc);
      if (winning(board, aiPlayer)) {
        setTimeout(function() {
          alert("YOU LOSE");
          reset();
        }, 500);
        return;
      } else if (round === 0) {
        setTimeout(function() {
          alert("tie");
          reset();
        }, 500);
        return;
      }
    }
  }
}

function reset() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $("td").css("background-color", "transparent");
}






/* for testing, we start with an advanced board
 T |   | F
 - - - - -
 F |   | F
 - - - - -
   | T | T
*/
var startingBoard = [true,1,false,false,4,false,6,true,true];
//var newBoard = [0,1,2,3,4,5,6,7,8];

//keep count of function calls
var fc = 0;

//finding the best play that favors the ai
// var bestPlay = play(startingBoard, aiPlayer);
// console.log("index: ", bestPlay.index);
// console.log("function calls: ", fc);

//set our players and declare their pieces
var huPlayer = true; //O
var aiPlayer = false; //X

//returns a list of empty spots on the board
function emptySpaces(board){
  return board.filter(s => s !== true && s !== false);
};

//testing to make sure the empty board spaces are returned.
// console.log("Empty Spaces: ", emptySpaces(startingBoard));
// console.log("Play Ai: ", play(startingBoard, aiPlayer));
// console.log("Play Hu: ", play(startingBoard, huPlayer));

//the main algorythm
function play(newBoard, player){

  //count the function calls
  fc++;

  //find all available spots
  let availableSpots = emptySpaces(newBoard);

  //check for win/lose/draw and return value
  if (winning(newBoard, huPlayer)){
    return {score: -100};
  } else if (winning(newBoard, aiPlayer)){
    return {score: 100};
  } else if (availableSpots.length === 0){
    return {score: 0};
  }

  //now collect the scores from each spot to evaluate later
  let moves = [];

  //loop through available spots
  for(let i = 0; i < availableSpots.length; i++){
    //create an object for each spots
    let move = {};
    move.index = newBoard[availableSpots[i]];

    //set the empty spot to the current player
    newBoard[availableSpots[i]] = player;

    //collect teh score resulted from calling play function
    if (player === aiPlayer){
      let result = play(newBoard, huPlayer);
      move.score = result.score;
    } else {
      let result = play(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availableSpots[i]] = move.index;

    //push the object to the array
    moves.push(move);
  }
  //don't do this. logs 60,000 moves arrays
  //console.log("Moves: ", moves);

  var bestMove;
  //if it's ai turn, loop and choose move with highest score.
  if(player === aiPlayer){
    let bestScore = -10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    //if it's human turn, loop and choose move with lowest score.
    var bestScore = 10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  //return the chosen move (object) from the moves array
  return moves[bestMove];
}



//All possible winning combos
function winning(board, player){
  if (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  ) {
    return true;
  } else {
    return false;
  }
};
