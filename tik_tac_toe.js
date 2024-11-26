let player1Set = "";
let player2Set = "";

function getBox(i) {
  if (i < 10) {
    return "┃ 0" + i + " ";
  }

  return "┃ " + i + " ";
}


function repeat(string, noOfTimes) {
  if (noOfTimes < 1) {
    return "";
  }

  return string + repeat(string, noOfTimes - 1);
}

function isEnd(number) {
  if (number === 3 || number === 6) {
    return "┃\n┣" + repeat("━", 14) + "┫\n";
  }

  if (number === 9) {
    return "┃\n┗" + repeat("━", 14) + "┛\n";
  }

  return "";
}

function getBoard() {
  let box = "";

  for (let i = 1; i <= 9; i++) {
    box = box + getBox(i) + isEnd(i);
  }
  return box;
}

function wholeBoard() {
  return "┏" + repeat("━", 14) + "┓\n" + getBoard();
}

function matchAtPosition(string, target, index, subIndex) {
  if (subIndex < target.length) {
    const isSame = string[index + subIndex] === target[subIndex];

    return isSame ? matchAtPosition(string, target, index, subIndex + 1) : false;
  }

  return true;
}

function isSubStringFound(string, target, index) {
  if (index < string.length) {
    const isMatch = matchAtPosition(string, target, index, 0);

    return isMatch ? true : isSubStringFound(string, target, index + 1);
  }

  return false;

}

function isSubString(string, otherString) {
  if (otherString === "") {
    return false;
  }

  return isSubStringFound(string, otherString, 0);
}

function addInput(remainingCells, input) {
  if (remainingCells % 2 === 0) {
    player2Set = player2Set + input;
  } else {
    player1Set = player1Set + input;
  }
}

function validateInput(input) {
  if (isSubString(player1Set + player2Set, input)) {
    console.log("entered number is already there")
    return readInput();
  }
  return input;
}

function readInput() {
  let input = prompt("enter number :: ");

  return validateInput(input);
}

function getMark(remainingCells) {
  return remainingCells % 2 === 0 ? "🟦" : "🟩"
}

function newBox(input, board, remainingCells) {
  let newBoard = "";
  let i  = 0;
  while(i < board.length) {
    if ( board[i + 1] === input) {
      newBoard = newBoard + getMark(remainingCells);
      i = i + 2;
    }
    newBoard = newBoard + board[i];
    i = i + 1;
  }

  return newBoard;
}

function isSubset(set, subSet) {
  let isTrue = true;

  for (let i = 0; i < 3; i++ ) {
    isTrue = isTrue && isSubString(set, subSet[i]);
  }

  return isTrue;
}

function isPlayerWon(set) {
  switch(true) {
    case isSubset(set, "123") : 
    case isSubset(set, "456") : 
    case isSubset(set, "789") : 
    case isSubset(set, "147") : 
    case isSubset(set, "258") : 
    case isSubset(set, "369") : 
    case isSubset(set, "159") : 
    case isSubset(set, "357") : return true;
  }

  return false;
}

function isGameOver(player1Set, player2Set) {
  if (isPlayerWon(player1Set)) {
    console.log("👏 Player 1 Won the game");
    return true;
  }

  if (isPlayerWon(player2Set)) {
    console.log("👏 Player 2 Won the game");
    return true;
  }

  return false;
}

function isSpaceAvailable(remianingCells, isWinnerFound) {
  if (remianingCells === 0 && !isWinnerFound) {
    console.log("🤝 Game is draw");
    return false;
  }

  return true;
}

function playGame(remainingCells, oldBoard, isWinnerFound) {
  if (!isSpaceAvailable(remainingCells, isWinnerFound) || isWinnerFound) {
    return "";
  }

  const playerInput = readInput(remainingCells);
  addInput(remainingCells, playerInput);
  let newBoard = newBox(playerInput, oldBoard, remainingCells);
  console.clear();
  console.log(newBoard);
  isWinnerFound = isGameOver(player1Set, player2Set);

  return playGame(remainingCells - 1, newBoard, isWinnerFound);
}

const board = wholeBoard();
console.log(board);
console.log(playGame(9, board, false));
