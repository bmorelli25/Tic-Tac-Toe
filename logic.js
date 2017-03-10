/* for testing, we start with an advanced board
   |   | F
 - - - - -
 F |   | F
 - - - - -
   | T | T
*/
var startingBoard = [0,1,false,false,4,false,6,true,true];
var newBoard = [0,1,2,3,4,5,6,7,8];

//set our players and declare their pieces
var huPlayer = true; //O
var aiPlayer = false; //X

//returns a list of empty spots on the board
function emptySpaces(board){
  return board.filter(s => s !== true && s !== false);
};

//testing to make sure the empty board spaces are returned.
console.log("Empty Spaces: ", emptySpaces(startingBoard));
console.log("Play Ai: ", play(startingBoard, aiPlayer));
console.log("Play Hu: ", play(startingBoard, huPlayer));
console.log("Play NEW HU: ", play(newBoard, aiPlayer));

//the main algorythm
function play(newBoard, player){

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
