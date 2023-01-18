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
import Cropper from "react-easy-crop";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";

import cropImage from "helpers/cropImage";

const DialogImageCrop = ({
  dialogTitle,
  isOpen,
  fileObjectUrl,
  onCancel,
  onConfirm,
}) => {
  const theme = useTheme();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyClick = async () => {
    const croppedImageUrl = await cropImage(
      fileObjectUrl,
      croppedAreaPixels,
      rotation
    );
    return onConfirm(croppedImageUrl);
  };

  return (
    <div style={{ position: "absolute" }}>
      <Dialog fullScreen open={isOpen} onClose={onCancel}>
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent sx={{ position: "relative" }}>
          <Cropper
            image={fileObjectUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", alignItems: "center" }}>
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
            onClick={handleApplyClick}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogImageCrop;
