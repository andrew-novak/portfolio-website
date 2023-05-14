const projectConstants = require("../constants/projects");

const isCorrectBehaviour = (passedBehaviour) => {
  const isFound = projectConstants.behaviours.some(
    (behaviour) => passedBehaviour === behaviour
  );
  return isFound;
};

const customButtonCheck = (button, { req }) => {
  const { behaviour, redirect, filename, isAwaitingFileUpload } = button;
  // check selected behaviour
  if (!isCorrectBehaviour(behaviour)) return false;
  // check specific fields
  if (!!redirect && !!filename) return false;
  if (!!redirect && !!isAwaitingFileUpload) return false;
  // correct button
  return true;
};

module.exports = customButtonCheck;
