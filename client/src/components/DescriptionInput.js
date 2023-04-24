import { useState } from "react";
import { useTheme, Typography, Button } from "@mui/material";
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

const DescriptionInput = ({
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

  // on hover outline color
  const [isHover, setIsHover] = useState(false);
  const outlineColor = isHover
    ? theme.custom.colors.outlineHover
    : theme.custom.colors.outline;

  const lightOutline = "rgb(233, 229, 229)";

  const FormButton = ({ startIcon, label, sx, onClick }) => (
    <Button
      variant="outlined"
      startIcon={startIcon}
      sx={{
        ...theme.custom.styles.inputLabel,
        borderColor: lightOutline,
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
            borderWidth: "2px",
            borderColor: "rgba(0, 0, 0, 0.6)",
            //backgroundImage: theme.custom.colors.neutralGradient,
            "&:hover": {
              borderWidth: "2px",
              borderColor: "rgba(0, 0, 0, 0.6)",
              backgroundColor: "rgb(233, 229, 229)",
              backgroundImage: null,
            },
          }),
        }}
        onClick={() => selectDescription(index, selectIndex, descriptionList)}
      />
    );
  };

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
      {/* Top Bar */}
      <div
        style={{
          borderBottom: `solid  1px ${outlineColor}`,
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
      {/* Sections */}
      <div
        style={{
          borderBottom: `solid  1px ${lightOutline}`,
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
                    borderRadius: "4px",
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
      {/* Block Style Control */}
      <div
        style={{
          borderBottom: `solid  1px ${lightOutline}`,
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
      {/* Inline Style Control */}
      <div
        style={{
          borderBottom: `solid 1px ${outlineColor}`,
        }}
      >
        {INLINE_STYLES.map(({ label, richStyle }) => (
          <FormButton
            key={label}
            label={label}
            onToggle={() => onInlineClick(richStyle)}
          />
        ))}
      </div>
      {/* Text Input */}
      <div
        style={{
          margin: "14px",
          cursor: "text",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={(newEditorState) => updateEditorState(newEditorState)}
        />
      </div>
    </div>
  );
};

export default DescriptionInput;
