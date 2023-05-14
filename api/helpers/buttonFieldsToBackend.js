const Project = require("../models/Project");

const buttonFieldsToBackend = async (projectId, passedButtons) => {
  //const takenFilenames = Project.find()

  const buttons = passedButtons.map((button) => ({
    icon: button.icon,
    label: button.label,
    behaviour: button.behaviour,
    redirect: button.redirect,
    filename: button.filename,
    isAwaitingFileUpload: button.isAwaitingFileUpload,
  }));
  return buttons;
};

module.exports = buttonFieldsToBackend;
