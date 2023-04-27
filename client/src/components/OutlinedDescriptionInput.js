import { useState, useRef } from "react";
import { useTheme, Box, Typography, Button } from "@mui/material";
import { Editor, EditorState, ContentState, RichUtils } from "draft-js";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesIcon from "@mui/icons-material/Notes";
import AddIcon from "@mui/icons-material/Add";
import "draft-js/dist/Draft.css";

const BLOCK_TYPES = [
  { label: "H1", richStyle: "header-one" },
  { label: "H2", richStyle: "header-two" },
  { label: "H3", richStyle: "header-three" },
  { label: "H4", richStyle: "header-four" },
  { label: "H5", richStyle: "header-five" },
  { label: "H6", richStyle: "header-six" },
  { label: "Blockquote", richStyle: "blockquote" },
  { label: "UL", richStyle: "unordered-list-item" },
  { label: "OL", richStyle: "ordered-list-item" },
  { label: "Code Block", richStyle: "code-block" },
];

const INLINE_STYLES = [
  { label: "Bold", richStyle: "BOLD" },
  { label: "Italic", richStyle: "ITALIC" },
  { label: "Underline", richStyle: "UNDERLINE" },
  { label: "Monospace", richStyle: "CODE" },
];

const OutlinedDescriptionInput = ({
  descriptionList: descriptionListProp,
  selectIndex: selectIndexProp,
  images,
  setDescription,
  selectDescription,
  clearDescriptionList,
}) => {
  const theme = useTheme();

  const selectIndex = selectIndexProp === null ? 0 : selectIndexProp;
  const descriptionList =
    descriptionListProp === null
      ? [EditorState.createEmpty()]
      : descriptionListProp;

  const editorState = descriptionList[selectIndex] || EditorState.createEmpty();

  const updateEditorState = (newEditorState) => {
    setDescription(selectIndex, newEditorState);
  };

  const onInlineClick = (richStyle) => {
    const nextState = RichUtils.toggleInlineStyle(editorState, richStyle);
    updateEditorState(nextState);
  };

  const onBlockClick = (richStyle) => {
    const nextState = RichUtils.toggleBlockType(editorState, richStyle);
    updateEditorState(nextState);
  };

  const FormButton = ({ startIcon, label, sx, onClick }) => (
    <Button
      startIcon={startIcon}
      variant="outlined"
      sx={{
        ...theme.custom.styles.inputLabel,
        borderColor: theme.custom.colors.outlineLight,
        margin: "4px",
        padding: "10px",
        paddingTop: "4px",
        paddingBottom: "4px",
        minWidth: 40,
        ...sx,
      }}
      onMouseDown={onClick}
    >
      {label}
    </Button>
  );

  const SelectDescriptionButton = ({ index }) => {
    const icon = descriptionList[index]?.getCurrentContent()?.hasText() ? (
      <NotesIcon sx={{ transform: "scale(1.3)" }} />
    ) : (
      <AddIcon sx={{ transform: "scale(1.3)" }} />
    );
    return (
      <FormButton
        label={icon}
        sx={{
          height: "54px",
          width: "54px",
          ...(index === selectIndex && {
            ...theme.custom.styles.outlineFocus,
            // overwriting MUI default behaviour
            "&:hover": {
              ...theme.custom.styles.outlineFocus,
            },
          }),
        }}
        onClick={() => selectDescription(index, selectIndex, descriptionList)}
      />
    );
  };

  const { colors } = theme.custom;

  // for Text Input outline
  const [isInputFocused, setIsInputFocused] = useState(false);
  const editorRef = useRef(null);
  const onInputFocus = (event) => {
    setIsInputFocused(true);
  };
  const onInputBlur = (event) => {
    setIsInputFocused(false);
  };

  return (
    /* Whole Description Input Component */
    <div
      style={{
        width: "100%",
      }}
    >
      {/* Top Bar (Title and Remove Buttons) */}
      <div
        style={{
          border: `solid  1px`,
          borderColor: colors.outline,
          borderTopLeftRadius: theme.custom.cssProps.outlineBorderRadius,
          borderRopRightRadius: theme.custom.cssProps.outlineBorderRadius,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Component Title */}
        <Typography
          sx={{
            ...theme.custom.styles.inputLabel,
          }}
        >
          Description
        </Typography>
        {/* Remove Description Buttons */}
        <div style={{ display: "flex" }}>
          {descriptionList[selectIndex]?.getCurrentContent()?.hasText() && (
            <FormButton
              startIcon={<DeleteIcon />}
              label="Selected"
              onClick={() =>
                updateEditorState(
                  EditorState.push(editorState, ContentState.createFromText(""))
                )
              }
            />
          )}
          {descriptionList &&
            descriptionList.some((description) =>
              description?.getCurrentContent()?.hasText()
            ) && (
              <FormButton
                startIcon={<DeleteIcon />}
                label="Everything"
                onClick={() => clearDescriptionList(descriptionList)}
              />
            )}
        </div>
      </div>
      {/* Buttons-Only Sections */}
      <div
        style={{
          borderLeft: "solid  1px",
          borderRight: "solid  1px",
          borderTopLeftRadius: theme.custom.cssProps.outlineBorderRadius,
          borderRopRightRadius: theme.custom.cssProps.outlineBorderRadius,
          borderColor: colors.outline,
        }}
      >
        {/* Button-Only Section 1 - Images & Text Segments */}
        <div
          style={{
            borderBottom: "solid  1px",
            borderColor: colors.outlineLight,
          }}
        >
          <SelectDescriptionButton index={0} />
          {
            // description button after each image
            images &&
              images.map((image, index) => (
                <span key={index}>
                  <span
                    src={image}
                    style={{
                      display: "inline-block",
                      verticalAlign: "middle",
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: 54,
                      height: 54,
                      borderRadius: theme.custom.cssProps.outlineBorderRadius,
                      margin: 4,
                    }}
                  />
                  <SelectDescriptionButton index={index + 1} />
                </span>
              ))
          }
          {
            // any description buttons after image description buttons
            descriptionList &&
              descriptionList.map((description, index) => {
                if (index > (images?.length || 0)) {
                  return <SelectDescriptionButton key={index} index={index} />;
                }
                return null;
              })
          }
        </div>
        {/* Button-Only Section 2 - Block Style Controls */}
        <div
          style={{
            borderBottom: "solid  1px",
            borderColor: colors.outlineLight,
          }}
        >
          {BLOCK_TYPES.map(({ label, richStyle }) => (
            <FormButton
              key={label}
              label={label}
              onToggle={() => onBlockClick(richStyle)}
              richStyle={richStyle}
            />
          ))}
        </div>
        {/* Button-Only Section 3 - Inline Style Control */}
        <div>
          {INLINE_STYLES.map(({ label, richStyle }) => (
            <FormButton
              key={label}
              label={label}
              onToggle={() => onInlineClick(richStyle)}
            />
          ))}
        </div>
      </div>
      {/* Text Input */}
      <Box
        sx={{
          padding: "14px",
          //cursor: "text",
          border: "1px solid",
          borderBottomLeftRadius: theme.custom.cssProps.outlineBorderRadius,
          borderBottomRightRadius: theme.custom.cssProps.outlineBorderRadius,
          borderColor: colors.outline,
          // On Hover
          "&:hover": {
            borderColor: colors.outlineHover,
          },
          // On Editor Focus
          ...(isInputFocused ? theme.custom.styles.outlineFocus : {}),
        }}
        onClick={() => editorRef.current?.focus()}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={(newEditorState) => updateEditorState(newEditorState)}
        />
      </Box>
    </div>
  );
};

export default OutlinedDescriptionInput;
