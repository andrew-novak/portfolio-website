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
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";

import cropImage from "helpers/cropImage";

const DialogVideoPreview = ({
  dialogTitle,
  isOpen,
  fileObjectUrl,
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
            flexDirection: "column",
            justifyContent: "center",
            borderBottom: "solid 1px",
            borderColor: theme.custom.colors.outline,
          }}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent sx={{ position: "relative" }}>
          <Player
            playsInline
            /*poster="/assets/poster.png"*/ src={fileObjectUrl}
          />
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
            onClick={() => onConfirm(fileObjectUrl)}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogVideoPreview;
