const projectConstants = require("../constants/projects");

function isContainingDuplicates(array) {
  if (array.length !== new Set(array).size) {
    return true;
  }
  return false;
}

// Buttons Array
const areButtonsOk = (buttons, { req }) => {
  const filenames = buttons.map((button) => button.filename);
  const onlyStringFilenames = filenames.filter(
    (name) => typeof name === "string"
  );
  const emptyStringFilenames = onlyStringFilenames.filter(
    (name) => name === ""
  );
  // invalid
  if (emptyStringFilenames.length > 0) return false;
  if (isContainingDuplicates(onlyStringFilenames)) return false;
  // valid
  return true;
};

const isCorrectBehaviour = (passedBehaviour) => {
  const isFound = projectConstants.behaviours.some(
    (behaviour) => passedBehaviour === behaviour
  );
  return isFound;
};

// Specific Button
const isButtonOk = (button, { req }) => {
  const { behaviour, redirect, filename, isAwaitingFileUpload } = button;
  // check selected behaviour
  if (!isCorrectBehaviour(behaviour)) return false;
  // check specific fields
  if (redirect && filename) return false;
  if (redirect && isAwaitingFileUpload) return false;
  // correct
  return true;
};

module.exports = { areButtonsOk, isButtonOk };
