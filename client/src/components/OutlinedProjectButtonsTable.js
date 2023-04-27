import { useState } from "react";
import { useTheme, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";

const OutlinedProjectButtonsTable = ({ buttons, onCreateClick }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        width: "100%",
        border: "solid 1px",
        borderColor: theme.custom.colors.outline,
        borderTopLeftRadius: theme.custom.cssProps.outlineBorderRadius,
        borderTopRightRadius: theme.custom.cssProps.outlineBorderRadius,
      }}
    >
      <div
        style={{
          width: "100%",
          borderBottom: "solid 1px",
          borderColor: theme.custom.colors.outline,
        }}
      >
        <Typography sx={theme.custom.styles.inputLabel}>Buttons</Typography>
      </div>
      <div style={{ width: "100%" }}>
        {
          /* One Button */
          buttons &&
            buttons.map((button) => (
              <div>
                <Typography>{button.label}</Typography>
                {/* Project-Button-Specific Actions */}
                <Button startIcon={<EditIcon />}></Button>
                <Button startIcon={<DeleteIcon />}></Button>
              </div>
            ))
        }
      </div>
      <Button startIcon={<AddIcon />} onClick={onCreateClick}>
        Add Button
      </Button>
    </div>
  );
};

export default OutlinedProjectButtonsTable;
