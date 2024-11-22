const GREEN = '🟢';
const RED = '🔴';
const BLUE = '🔵';
const YELLOW = '🟡';
const WHITE = '⚪️';
const ORANGE = '🟠';
const PURPLE = '🟣';
const BROWN = '🟤';
const BLACK = '⚫️';


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

function getColor(digit) {
  switch (digit) {
    case '9': return BROWN;
    case '1': return RED;
    case '2': return BLUE;
    case '3': return YELLOW;
    case '4': return WHITE;
    case '5': return BLACK;
    case '6': return ORANGE;
    case '7': return PURPLE;
    case '8': return GREEN;
  }
}

function getRandomNumber() {
  return 1 + Math.ceil(Math.random() * 8) + "";
}

function getRandomSectetCode(secretCode, secretNumber) {
  if (secretNumber.length >= 4) {
    return secretNumber;
  }

  const number = getRandomNumber();

  if (!isSubString(secretNumber, number)) {
    secretNumber = secretNumber + number
    secretCode = secretCode + getColor(number);
  }

  return getRandomSectetCode(secretCode, secretNumber);
}

function pointNToC(number) {
  if (number === 10) {
    return "";
  }

  const color = getColor(number + '');

  return color + "->" + number + " " + pointNToC(number + 1);
}

function convertToColor(number, color, index) {
  if (color.length === 8) {
    return color;
  }

  return convertToColor(number, color + getColor(number[index]), index + 1);

}

function getMark(number, index) {
  return secretCode[index] === number[index] ? '✅' : '❎';
}

function shuffleTwo(string) {
  return string[1] + string[0];
}

function shuffleThree(string) {
  return string[1] + string[0] + string[2];
}

function shuffleFour(string) {
  return string[1] + string[0] + string[3] + string[2];
}

function shuffle(string) {
  switch (string.length) {
    case 0: return string + "      ";
    case 1: return string + "     "
    case 2: return shuffleTwo(string) + "   ";
    case 3: return shuffleThree(string) + "  ";
    case 4: return shuffleFour(string);
  }

  return string;
}

function getShuffled(string, noOfTimes) {
  if (noOfTimes === 0) {
    return string;
  }

  return getShuffled(shuffle(string), noOfTimes - 1);
}

function getMatches(number, index, match) {
  if (index === 4) {
    return getShuffled(match, Math.ceil(Math.random()) * 10);
  }

  if (isSubString(secretCode, number[index])) {
    match = match + getMark(number, index);
  }

  return getMatches(number, index + 1, match);
}

function sorryMsg(guessedColor) {
  let msg = "\nTHE NUMBER IS " + secretCode + " " + guessedColor + "\n";
  msg += "\n🙁 SORRY YOU LOST THE GAME \n";
  msg += "\n👍 BETTER LUCK FOR NEXT TIME \n";

  return msg;
}

function playGame(chances) {
  const guessedNumber = prompt("");
  const guessedColor = convertToColor(guessedNumber, "", 0);

  let guessed = repeat("-", 11) + "> ::   " + guessedColor + " ";
  guessed += getMatches(guessedNumber, 0, "");
  console.log(guessed);
  console.log("CHANCES LEFT :: " + chances);

  if (guessedNumber === secretCode) {
    return "\n 💐 CONGRATULATIONS YOU WON THE GAME";
  }

  if (chances < 1) {
    return sorryMsg(guessedColor);
  }
  return playGame(chances - 1);

}

function repeat(string, noOfTimes) {
  if (noOfTimes < 1) {
    return "";
  }

  return string + repeat(string, noOfTimes - 1);
}


function introduction() {
  let intro = "\n" + repeat("-", 15) + " 🔥 WELCOME TO MASTERMIND 🔥 ";

  intro += repeat("-", 15) + "\n";
  intro += "👉 NUMBERS FROM 1 TO 9 ";
  intro += "\n👉 GUESSING NUMBER SHOULD BE FOUR DIGIT NUMBER";
  intro += "\n👉 ❎ INDICATES THAT COLOR IS PRESENT IN THE SEQUENCE ";
  intro += "BUT POSITION NOT MATCH ";
  intro += "\n👉 ✅ INDICATES THAT COLOR PRESENT AT CORRECT POTISION";

  return intro;
}

const allColours = pointNToC(1);
const secretCode = getRandomSectetCode("", "");
// console.log(secretCode)

console.log(introduction());
console.log(allColours);
console.log(playGame(9));

