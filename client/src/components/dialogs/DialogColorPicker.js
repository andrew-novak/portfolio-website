import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { ChromePicker } from "react-color";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";

import cropImage from "helpers/cropImage";

const DialogColorPicker = ({
  dialogTitle,
  isOpen,
  color,
  onColorChange,
  onCancel,
  onConfirm,
}) => {
  const theme = useTheme();

  return (
    <div style={{ position: "absolute" }}>
      <Dialog fullScreen open={isOpen} onClose={onCancel}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "solid 1px",
            borderColor: theme.custom.colors.outline,
          }}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: color,
          }}
        >
          <div>
            <ChromePicker
              color={color || "rgb(255, 255, 255)"}
              onChangeComplete={(newColor) => onColorChange(newColor.hex)}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            alignItems: "center",
            borderTop: "solid 1px",
            borderColor: theme.custom.colors.outline,
          }}
        >
          <Button
            startIcon={<HighlightOffIcon />}
            variant="contained"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <div style={{ width: 50 }} />
          <Button
            startIcon={<CheckIcon />}
            variant="contained"
            onClick={() => onConfirm(color)}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogColorPicker;
