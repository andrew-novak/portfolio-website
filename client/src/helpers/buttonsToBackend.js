const buttonsToBackend = (buttons) => {
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
            filename,
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
  if (hasFiles) {
    form = new FormData();
    buttonFiles.forEach((file, index) => {
      file && form.append(index, file, index);
    });
  }
  return { buttonFields, buttonFilesForm: form };
};

export default buttonsToBackend;
