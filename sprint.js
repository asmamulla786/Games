const getLocation = function (index, code, offset) {
  return code[index + offset] - 1;
};

const add = function (code, location1, location2, desitinationLocation) {
  code[desitinationLocation] = code[location1] + code[location2];
};

const subtract = function (code, location1, location2, desitinationLocation) {
  code[desitinationLocation] = code[location1] - code[location2];
};

const performOperation = function (code, index, operation) {
  const location1 = getLocation(index, code, 1);
  const location2 = getLocation(index, code, 2);
  const desitinationLocation = getLocation(index, code, 3);
  operation(code, location1, location2, desitinationLocation);
};

const addAndPut = function (index, code) {
  performOperation(code, index, add);

  return index + 4;
};

const subtractAndput = function (index, code) {
  performOperation(code, index, subtract);

  return index + 4;
};

const jumpTo = function (index, code) {
  return getLocation(index, code, 1);
};

const displayErrorMessage = function (command) {
  console.log(command, "IS INVALID COMMAND");
};

const putElement = function (code, sourceLocation, desitinationLocation) {
  code[desitinationLocation] = code[sourceLocation];
};

const copyAndPaste = function (index, code) {
  const sourceLocation = getLocation(index, code, 1);
  const desitinationLocation = getLocation(index, code, 2);
  putElement(code, sourceLocation, desitinationLocation);

  return index + 3;
};

const isEqual = (number1, number2) => number1 === number2;

const isLessThan = (number1, number2) => number1 < number2;

const conditionalJump = function (code, index, condition) {
  const location1 = getLocation(index, code, 1);
  const location2 = getLocation(index, code, 2);
  const desitination = getLocation(index, code, 3);

  return condition(code[location1], code[location2]) ? desitination : index + 4;
};

const jumpIfEqual = function (index, code) {
  return conditionalJump(code, index, isEqual);
};

const jumpIfLessThan = function (index, code) {
  return conditionalJump(code, index, isLessThan);
};

const executeCommand = function (index, code) {
  const allCommands = {
    1: addAndPut,
    2: subtractAndput,
    3: jumpTo,
    4: jumpIfEqual,
    5: jumpIfLessThan,
    7: copyAndPaste,
  };

  if (!(code[index] in allCommands)) {
    return displayErrorMessage(code[index]);
  }

  return allCommands[code[index]](index, code);
};

const executeProgram = function (code) {
  let currentPointerAt = 0;
  while (code[currentPointerAt] !== 9) {
    currentPointerAt = executeCommand(currentPointerAt, code);
  }
};

const inNumber = function (number) {
  return +number;
};

const main = function () {
  const input = prompt("Enter code :: ");
  const code = input.split(" ").map(inNumber);
  executeProgram(code);
  console.log("output is :: ", code.join(" "));
};

main();
