/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

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
          //console.log(Math.abs(sequence[i].indexOf(1) - item.indexOf(1)));
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
