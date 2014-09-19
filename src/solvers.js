/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



window.bitQueens = function(n) {

  var count = 0;
  var right = 0;
  var column = 0;
  var left = 0;

  var search(col, rd, ld) {
    for (var i = 0; i < n; i++) {
      if ((col | rd | ld).toString.indexOf(0) === i) {
        rd = col >> 1;
        if (col << 1 > (1 << n - 1)) {
          parseInt((ld = col << 1).toString(2).slice(1) + 0, 2);
        } else {
         ld = col << 1;
        }
        col = col | 1 << (n - 1 - i);
      }
      if ((col | rd | ld) < (1 << n) - 1) {
        search(col, rd, ld);
      }
    }
  }




}

window.nQueens = function(n) {
  solutions = 0;

  var board = new Board(n);

  // Check index if any conflicts
  // If conflicts with any other piece, continue
  // If no conflicts, place it (togglePiece)
  var place = function(row, column) {
    if (!board.hasQueenConflictsOn(row,column)) {
      board.togglePiece(row, column);
      if ()
      place(row+1, 0);
    }

  }

  place(0,0);
  return solutions;
}

window.generateBoards = function(n) {
  var firstRows = [];
  var sequence = [];
  var results = [];

  for (var i = 0; i < n; i++){
    var array = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
    array[i] = 1;
    firstRows.push(array);
  }


  var recurse = function(row) {
    _.each(firstRows, function(item){
      if (!(sequence.length === 0 && firstRows.indexOf(item) >= Math.round(firstRows.length/2))) {
        var hasConflict = false;
        for (var i = 0; i < sequence.length; i++){
          if (sequence[i].indexOf(1) === item.indexOf(1) || Math.abs(sequence[i].indexOf(1) - item.indexOf(1)) === sequence.length - i){
            return hasConflict = true;
          }
        }

        if (!hasConflict){
          //debugger;
          sequence.push(item);
          if (sequence.length === n){
            results.push(sequence.slice());
            if ((n % 2 === 0) || (n % 2 !== 0 && sequence[0] !== firstRows[Math.floor(firstRows.length/2)])) {
              //console.log(item);
              var mirrorResult = [];
              for (var i = 0; i < sequence.length; i++) {
                var mirrorRow = sequence[i].slice();
                mirrorRow.reverse();
                mirrorResult.push(mirrorRow);


              }
              results.push(mirrorResult);
            }
          } else {
            recurse(n);
          }
          sequence.pop();
        }
      }
    });
  }
  recurse(n);
  return results;
}

// console.time('timing');
// generateBoards(11);
// console.timeEnd('timing');

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var boards = generateBoards(n);
  //If n rooks can be placed on board and there are no conflicts using rowConflict and columnConflict methods
  var solution = undefined; //fixme
  _.each(boards, function(board) {
    boardObj = new Board(board);
    if (!boardObj.hasAnyRooksConflicts()) {
      solution = boardObj.rows();
    }
  });


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var boards = generateBoards(n);

  var solutionCount = 0; //fixme

  _.each(boards, function(board) {
    boardObj = new Board(board);
    if (!boardObj.hasAnyRooksConflicts()) {
      solutionCount++;
    }
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var boards = generateBoards(n);
  //If n rooks can be placed on board and there are no conflicts using rowConflict and columnConflict methods
  var solution = undefined; //fixme
  _.each(boards, function(board) {
    boardObj = new Board(board);
    //console.log(board);
    if (!boardObj.hasAnyQueensConflicts()) {
      solution = boardObj.rows();
    }
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var boards = generateBoards(n);

  var solutionCount = 0; //fixme

  _.each(boards, function(board) {
    boardObj = new Board(board);
    if (!boardObj.hasAnyQueensConflicts()) {
      solutionCount++;
    }
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
