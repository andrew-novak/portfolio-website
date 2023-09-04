const buttonsForSubmit = (buttons) => {
  const finalAccumulator = buttons.reduce(
    (accumulator, button) => {
      const { icon, label, behaviour, redirect, filename, file } = button;
      return {
        buttonFields: [
          ...accumulator.buttonFields,
          {
            icon,
            label,
            behaviour,
            redirect,
            filename: file?.name || filename,
            isAwaitingFileUpload: !!file,
          },
        ],
        hasFiles: accumulator.hasFiles || !!file,
        buttonFiles: [...accumulator.buttonFiles, file ? file : null],
      };
    },
    // initial value
    { buttonFields: [], hasFiles: false, buttonFiles: [] }
  );
  const { buttonFields, hasFiles, buttonFiles } = finalAccumulator;
  let form = null;
  const buttonFilesProgresses = {};
  if (hasFiles) {
    form = new FormData();
    buttonFiles.forEach((file, index) => {
      if (file) {
        buttonFilesProgresses[index] = {
          filename: file.name,
          progress: "awaiting",
        };
        form.append(index, file, file.name);
      }
    });
  }
  return {
    buttonFields,
    buttonFilesForm: form,
    buttonFilesProgresses,
  };
};

export default buttonsForSubmit;
