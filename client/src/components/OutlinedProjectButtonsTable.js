import { useRef, useState } from "react";
import { useTheme, Typography, Button, Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";

import { PROJECT_BUTTON_ICONS } from "constants/projects";

const OutlinedProjectButtonsTable = ({
  buttons,
  onRun,
  onEdit,
  onRemove,
  onCreate,
}) => {
  const theme = useTheme();

  const getIcon = (iconName) => {
    const foundIcon = PROJECT_BUTTON_ICONS.find((obj, index) => {
      if (iconName === obj.value) return true;
      return false;
    });
    if (foundIcon && foundIcon.MuiIcon) {
      return <foundIcon.MuiIcon />;
    }
    return null;
  };

  const Row = ({ children, isBottomBorder }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: theme.custom.colors.outline,
        borderBottom: isBottomBorder && "1px solid",
        borderBottomColor: theme.custom.colors.outlineLight,
      }}
    >
      {children}
    </div>
  );

  const Cell = ({ justify, w, children, isRightBorder }) => (
    <Box
      sx={{
        color: theme.custom.colors.inputLabel,
        width: w,
        display: "flex",
        justifyContent: justify,
        alignItems: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        borderRight: isRightBorder && "1px solid",
        borderColor: theme.custom.colors.outlineLight,
        padding: theme.spacing(1),
      }}
    >
      {children}
    </Box>
  );

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {/* Section 1 - Component Title */}
      <div
        style={{
          width: "100%",
          borderStyle: "solid",
          borderWidth: "1px",
          borderBottomWidth: buttons?.length > 0 ? "1px" : 0,
          borderTopLeftRadius: theme.custom.cssProps.outlineBorderRadius,
          borderTopRightRadius: theme.custom.cssProps.outlineBorderRadius,
          borderColor: theme.custom.colors.outline,
        }}
      >
        <Typography sx={theme.custom.styles.inputLabel}>Buttons</Typography>
      </div>
      {/* Section 2 - Buttons Table */}
      {buttons && buttons.length > 0 && (
        <div>
          <Row isBottomBorder={true}>
            <Cell w="50px" justify="center" isRightBorder={true}>
              Icon
            </Cell>
            <Cell w="calc(100% - 300px)" isRightBorder={true}>
              Label
            </Cell>
            <Cell w="100px" justify="center" isRightBorder={true}>
              Behaviour
            </Cell>
            <Cell w="150px" justify="center" isRightBorder={false}>
              Actions
            </Cell>
          </Row>
          {buttons.map((button, index) => (
            <Row
              key={index}
              isBottomBorder={index < buttons.length - 1 ? true : false}
            >
              <Cell w="50px" justify="center" isRightBorder={true}>
                {getIcon(button.icon)}
              </Cell>
              <Cell w="calc(100% - 300px)" isRightBorder={true}>
                {button.label}
              </Cell>
              <Cell w="100px" justify="center" isRightBorder={true}>
                {button.behaviour}
              </Cell>
              <Cell w="150px" justify="center" isRightBorder={false}>
                <IconButton onClick={() => onRun(index)}>
                  <PlayArrowIcon />
                </IconButton>
                <IconButton onClick={() => onEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Cell>
            </Row>
          ))}
        </div>
      )}
      {/* Section 3 - Add Button */}
      <Button
        startIcon={<AddIcon />}
        sx={{
          width: "100%",
          border: "1px solid",
          borderColor: theme.custom.colors.outline,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: theme.custom.cssProps.outlineBorder,
          borderBottomRightRadius: theme.custom.cssProps.outlineBorder,
          padding: theme.custom.cssProps.outlinePadding,
          "&:hover": {
            borderColor: theme.custom.colors.outlineHover,
          },
        }}
        onClick={onCreate}
      >
        Add Button
      </Button>
    </div>
  );
};

export default OutlinedProjectButtonsTable;
