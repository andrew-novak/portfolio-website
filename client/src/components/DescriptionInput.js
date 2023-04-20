import { useTheme, Typography, Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const DescriptionInput = ({ description, onChange }) => {
  const theme = useTheme();

  if (description && !(description instanceof EditorState)) {
    throw new Error(
      "'description' argument in <DescriptionInput /> must be an instance of EditorState " +
        description
    );
  }

  const [editorState, setEditorState] = useState(
    description || EditorState.createEmpty()
  );

  const updateEditorState = (state) => {
    setEditorState(state);
    onChange && onChange(state);
  };

  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  useEffect(() => {
    focusEditor();
  }, []);

  const StyleButton = (props) => {
    let onClickButton = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    return (
      <Button
        variant="outlined"
        sx={{
          ...theme.custom.styles.inputLabel,
          borderColor: "rgb(233, 229, 229)",
          padding: "10px",
          margin: "4px",
          minWidth: 40,
        }}
        onMouseDown={onClickButton}
      >
        {props.label}
      </Button>
    );
  };

  const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Code Block", style: "code-block" },
  ];

  const BlockStyleControls = (props) => {
    return (
      <div
        style={{
          borderBottom: `solid  1px ${outlineColor}`,
        }}
      >
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
  ];

  const InlineStyleControls = (props) => {
    return (
      <div
        style={{
          borderBottom: `solid 1px ${outlineColor}`,
        }}
      >
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const onInlineClick = (e) => {
    let nextState = RichUtils.toggleInlineStyle(editorState, e);
    updateEditorState(nextState);
  };

  const onBlockClick = (e) => {
    let nextState = RichUtils.toggleBlockType(editorState, e);
    updateEditorState(nextState);
  };

  const [isHover, setIsHover] = useState(false);
  const outlineColor = isHover
    ? theme.custom.colors.outlineHover
    : theme.custom.colors.outline;

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        border: `solid 1px ${outlineColor}`,
        borderRadius: "4px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          ...theme.custom.styles.inputLabel,
          borderBottom: `solid  1px ${outlineColor}`,
        }}
      >
        Description
      </Typography>
      <BlockStyleControls onToggle={onBlockClick} />
      <InlineStyleControls onToggle={onInlineClick} />
      <div
        style={{
          margin: "14px",
          cursor: "text",
        }}
        onClick={focusEditor}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={(editorState) => updateEditorState(editorState)}
        />
      </div>
    </div>
  );
};

export default DescriptionInput;
