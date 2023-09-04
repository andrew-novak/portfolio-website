// - Returns object of buttons,
//   where each key is button's index in "buttons" field
//   and all buttons has isAwaitingFileUpload set to true
// - Returns empty object even if no project or "buttons" field is null/undefined
const getAwaitingButtonsFromProject = (project) => {
  const awaitingButtons = {};

  (project.buttons || []).forEach((button, index) => {
    if (button.isAwaitingFileUpload) {
      awaitingButtons[index] = button;
    }
  });

  return awaitingButtons;
}

module.exports = getAwaitingButtonsFromProject;
