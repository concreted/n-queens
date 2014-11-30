/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

var timeBitQueens = function(n) {
  console.time('bitQueens in');
  bitQueens(n);
  console.timeEnd('bitQueens in');
}

var bitQueens = function(n) {
  var count = 0;

  // Row of n ones (i.e. n=3 --> 111)
  var all = (1 << n) - 1;
  
  var placeQueen = function(ld, col, rd) {
    // If col is filled with n ones, it's a complete solution
    if (col === all) {
      count++;
    } else {
      // From current ld, col, rd, generate threats 
      var threats = (ld | col | rd);
      
      // The next row's possible queen positions are 
      // determined by inverting threats and &ing with all.
      // In initial case, there are no threats:     000
      // Inverting threats gives:                   111
      // &ing with all gives:                       111
      var possible = (~threats) & all;

      // Loop through while there are any possible
      // queen positions available.
      while(possible) {
        // Get the next available queen position by bit.
        var bit = possible & -possible;

        // Remove that possibility from the possible positions.
        //possible = possible ^ bit;
        possible -= bit;
        // Calculate next row's left diagonal threats,
        // next row's right diagonal threats,
        // and next row's column threats.
        // Recurse on that new threat. 
        placeQueen( (ld|bit)<<1, col|bit, (rd|bit)>>1 );
      }
    }
  }

  placeQueen(0, 0, 0);

  return count;
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
