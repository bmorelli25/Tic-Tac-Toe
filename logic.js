/* for testing, we start with an advanced board
 T |   | F
 - - - - -
 F |   | F
 - - - - -
   | T | T
*/
var startingBoard = [true,1,false,false,4,false,6,true,true];

//set our players and declare their pieces
var huPlayer = true; //O
var aiPlayer = false; //X

//returns a list of empty spots on the board
function emptySpaces(board){
  return board.filter(s => s !== true && s !== false);
};

//testing to make sure the empty board spaces are returned.
console.log("cool", emptySpaces(startingBoard));
