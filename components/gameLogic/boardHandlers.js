
// There are two sections to this, first there are processors of data that is taken from the firebase database. 
// Then there are 

/*explanation of move hashes:
  lastMove: stored as "<team><size><sizeIdx (a or b)><originIdx(0 = pieceCorral)><destinationIdx>"
      by index: 0: team, 1: size, 2: sizeIdx, 3: origin, 4: destination. 
      R3a25 would be a move of a red's "first" large piece from position 2 to position 5.
  hist: stored as "<team><size><sizeIdx (a or b)><originIdx(0 = pieceCorral)><destinationIdx>"
      Each move causes two changes in the history, one in the origin BoardSquare, one in the destinationIdx.
      Therefore, you can determine which pieces are still on the square (thus determining the value of the "owns")
      key by checking to see if the piece has moved (the hist contains a more recent hist hash of the same piece with
      a origin key matching the BoardSquare key but with an destination key that is different.
  canMove: This is an array of all of the pieces that can currently move from the square (this is a filtered array
      of matching pieces from the hist property.
*/


board = { 0: null,//this.state.remainingPieces.blue,
          1: {hist : [], owns : null, canMove : []},
          2: {hist : ["R3a25"], owns : null, canMove : []},
          3: {hist : [], owns : null, canMove : []},
          4: {hist : [], owns : null, canMove : []},
          5: {hist : ["R3a25"], owns : null, canMove : []},
          6: {hist : [], owns : null, canMove : []},
          7: {hist : [], owns : null, canMove : []},
          8: {hist : [], owns : null, canMove : []},
          9: {hist : [], owns : null, canMove : []}, 
          10: null//this.state.remainingPieces.red
        }
var lastMove = "R3a25"

histHandler = (lastMove, board) => {
  // this takes the lastMove as an argument from this.state and then updates the hist of the
  // appropriate BoardSquares with the move.
  let origin = lastMove[3]; 
  let destination = lastMove[4]; 

  board[origin][hist].push(lastMove)
  board[destination][hist].push(lastMove)
  return board; 
};



let ownHandler = (board) => {
  // this is a helper method that takes in the board object, reads the history of each square
  // and updates the "owns" property of each. The owns property is read as "R" or "B"
  for (var i = 1; i <= 9; i++) {
    let square = board[i];
    let ownsProp = square["owns"];
    let hist = square["hist"]
    // let lastMove = this.state.lastMove // this needs to be added back in
    // if the square's most recent move was the lastMove, update the ownsProp. 
    if (hist.length > 0 && hist[hist.length - 1] === lastMove) {
      // pName returns just the piece name without the moves attached. "R3a61" => "R3a"
      const pName = (piece) => piece.split("").reverse().splice(2, 3).reverse().join(""); //tested
      // piecesOn takes in a hist and then returns only the pieces that are actually on the 
      // square still. tested
      const piecesOn = (hst) => {
      var hst = hst.map((move) => pName(move))
        return hst.reduce((stillOn, move) => {
          return hst.filter((el) => move === el).length % 2 !== 0 && !stillOn.includes(move) ? stillOn.concat(move) : stillOn}, [])
      }          
      let currentPieces = piecesOn(hist);  
      let ownsProp = (currentPieces.sort((a, b) => Number(a[1]) - Number(b[1]))[on.length - 1])[0]
    }
    return board; 
  };
}












  
  