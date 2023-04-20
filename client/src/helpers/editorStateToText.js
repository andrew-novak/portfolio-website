import { convertToRaw } from "draft-js";

const editorStateToText = (editorState) => {
  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;

  const text = blocks
    .map((block) => (!block.text.trim() && "\n") || block.text)
    .join("\n");

  return text;
};

export default editorStateToText;
