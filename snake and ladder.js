function getBox(number, player, computer) {

  if (number === computer && number === player) {
    return "| " + '👯‍♂️' + " ";
  }

  switch (number) {
    case player: return "| " + '😎' + " ";
    case computer: return "| " + '🏀' + " ";
    case 100: return "| " + '🏆' + " ";
    case 1: return "| " + '👍' + " ";
  }

  if (isSnake(number)) {
    return "| " + '🐍' + " ";
  }

  if (isLadder(number)) {
    return "| " + '🪜' + " ";
  }

  if (number < 10) {
    return "| 0" + number + " ";
  }

  return "| " + number + " ";
}

function isEnd(number) {
  if (number % 10 === 0) {
    return " |\n|" + repeat("-", 50) + "|\n";
  }

  return ""
}

function getBoard(player, computer) {
  let number = ""

  for (let i = 1; i <= 100; i++) {
    number = number + getBox(i, player, computer) + isEnd(i);
  }
  return number;
}

function wholeBoard(player, computer) {
  return " \n|" + repeat("-", 50) + "|\n" + getBoard(player, computer);
}

function congratulateWinner(winner, playerName) {
  if (winner === playerName) {
    console.log("\n👏 Congratulations " + winner + " You won the game\n");
    return "";
  }

  console.log("\n👏 " + winner + " You won the game\n");
  console.log("\n😔 Sorry " + playerName + " You lost the game.");
  console.log("\n Best of luck for the next time 👍\n");

}

function repeat(string, noOfTimes) {
  if (noOfTimes < 1) {
    return "";
  }

  return string + repeat(string, noOfTimes - 1);
}

function whoWon(playerName, yourScore) {
  if (yourScore >= 100) {
    return playerName;
  }
  return "Computer";
}

function jumpFrom(number) {
  console.log("\n😀 WOW YOU HIT LADDER 🪜🪜🪜🪜🪜🪜🪜\n");
  switch (number) {
    case 1: return 38;
    case 4: return 14;
    case 8: return 30;
    case 21: return 42;
    case 28: return 76;
    case 50: return 67;
    case 71: return 92;
    case 88: return 99;
  }
}

function isLadder(number) {
  switch (number) {
    case 1:
    case 4:
    case 8:
    case 21:
    case 28:
    case 50:
    case 71:
    case 88: return true;
  }

  return false;
}

function isSnake(number) {
  switch (number) {
    case 97:
    case 95:
    case 62:
    case 88:
    case 36:
    case 32: return true;
  }

  return false;
}

function returnFrom(number) {
  console.log("😈😈😈  OOPS.. YOU HIT SNAKE  🐍🐍🐍🐍🐍🐍🐍\n");
  switch (number) {
    case 97: return 78;
    case 95: return 56;
    case 62: return 18;
    case 88: return 24;
    case 36: return 6;
    case 32: return 10;
  }
}

function move(number) {
  if (isLadder(number)) {
    return jumpFrom(number);
  }

  if (isSnake(number)) {
    return returnFrom(number);
  }

  return number;
}

function rollDiceAndGiveNumber() {
  return Math.ceil(Math.random() * 6);
}

function playGame(playerName, yourScore, computerScore) {
  if (yourScore >= 100 || computerScore >= 100) {
    return whoWon(playerName, yourScore);
  }

  prompt("Your turn " + playerName + " to roll 🎲 press enter\n ");
  let youGot = rollDiceAndGiveNumber();
  console.log(playerName + " Got :: " + youGot);
  yourScore = yourScore + youGot;

  if (yourScore > 100) {
    yourScore = yourScore - youGot;
  }

  yourScore = move(yourScore);
  console.log(wholeBoard(yourScore, computerScore));

  prompt("\nTo see computer score press enter\n");
  const computerGot = rollDiceAndGiveNumber();
  computerScore = computerScore + computerGot;

  if (computerScore > 100) {
    computerScore = computerScore - computerGot;
  }

  console.log("Computer Got :: " + computerGot + "\n");
  computerScore = move(computerScore);
  console.log(wholeBoard(yourScore, computerScore));


  return playGame(playerName, yourScore, computerScore);
}

function startGame() {
  const playerName = prompt("enter your Name :: ", "Asma");
  console.log(playerName + " Your symbol :: 😎");
  const computer = "Computer";
  console.log(computer + " symbol  :: 🏀");
  const top = repeat("-", 40) + " " + playerName + " VS Computer " + repeat("-", 40);

  console.log("Let's go.....\n");
  console.log(top);

  const winner = playGame(playerName, 0, 0);
  congratulateWinner(winner, playerName);
}

startGame();

