import { useRef, useState, useEffect, Fragment } from "react";
import { useTheme, TextField, Chip, IconButton } from "@mui/material";
import Downshift from "downshift";
import AddIcon from "@mui/icons-material/Add";

const TagsInput = ({
  onTagListChange,
  placeholder,
  tags: passedTags,
  ...other
}) => {
  const theme = useTheme();

  const textInputRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(passedTags || []);

  useEffect(() => {
    onTagListChange(tags);
  }, [tags]);

  const onEnter = (target) => {
    const newSelectedItem = [...tags];
    const duplicatedValues = newSelectedItem.indexOf(target.value.trim());

    if (duplicatedValues !== -1) {
      setInputValue("");
      return;
    }
    if (!target.value.replace(/\s/g, "").length) return;

    newSelectedItem.push(target.value.trim());
    setTags(newSelectedItem);
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      return onEnter(event.target);
    }
    if (tags.length && !inputValue.length && event.key === "Backspace") {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  function handleChange(item) {
    let newSelectedItem = [...tags];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setTags(newSelectedItem);
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...tags];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setTags(newSelectedItem);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        selectedItem={tags}
        onChange={handleChange}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div style={{ width: "100%" }}>
              <TextField
                inputRef={textInputRef}
                InputProps={{
                  startAdornment: tags.map((item) => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      sx={{ margin: theme.spacing(0.5, 0.25) }}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  endAdornment: (
                    <IconButton onClick={() => onEnter(textInputRef.current)}>
                      <AddIcon />
                    </IconButton>
                  ),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
    </Fragment>
  );
};

export default TagsInput;
