import { EditorState, convertToRaw } from "draft-js";

const descriptionToBackend = (description) => {
  if (!(description instanceof EditorState)) return;
  if (!description.getCurrentContent().hasText()) return null;

  const contentState = description.getCurrentContent();
  const rawDescription = convertToRaw(contentState);
  return rawDescription;
};

export default descriptionToBackend;
