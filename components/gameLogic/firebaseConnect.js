









// this needs to be bound inside the app so that the state is updated correctly
let newGame = () => {
  //piece format: "<team><size><sizeindex (a or b)<location = 0 if from pieceCorral, number if not.><index of move>"
  let remainingPieces = { 
    // these do not have a <index of move> code because they have not been moved.
    red: ["R3a00","R3b00", "R2a00", "R2b00", "R1a00", "R1b00"],
    blue: ["B3a00","B3b00", "B2a00", "B2b00", "B1a00", "B1b00"]

  let boardState = {
    // each index is a position on the board, read from left to right.
    // the zero and ten index is reserved to denote each team's corral.
    0: this.state.remainingPieces.blue,
    1: {hist : [], owns : null, canMove : []},
    2: {hist : [], owns : null, canMove : []},
    3: {hist : [], owns : null, canMove : []},
    4: {hist : [], owns : null, canMove : []},
    5: {hist : [], owns : null, canMove : []},
    6: {hist : [], owns : null, canMove : []},
    7: {hist : [], owns : null, canMove : []},
    8: {hist : [], owns : null, canMove : []},
    9: {hist : [], owns : null, canMove : []}, 
    10: this.state.remainingPieces.red
    },  
  }
  // need to send this information to the firebase database
  this.setState({ remainingPieces , boardState})
}