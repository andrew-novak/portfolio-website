import {
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Container,
  ButtonGroup,
  Button,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";

const DialogMediaEdit = ({
  dialogTitle,
  isOpen,
  // state
  mediaUrl,
  disableMoveLeft,
  disableMoveRight,
  // actions
  onCancel,
  onMoveLeft,
  onMoveRight,
  onRemove,
}) => {
  const theme = useTheme();
  const isMaxSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
          }}
        >
          <div
            src={mediaUrl}
            style={{
              backgroundImage: `url(${mediaUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: 400,
              height: 400,
            }}
          />
        </DialogContent>
        {isMaxSm && (
          <DialogActions
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ButtonGroup>
              <Button
                disabled={disableMoveLeft}
                startIcon={<ArrowBackIcon />}
                onClick={onMoveLeft}
              >
                Move Left
              </Button>
              <Button
                disabled={disableMoveRight}
                startIcon={<ArrowForwardIcon />}
                onClick={onMoveRight}
              >
                Move Right
              </Button>
            </ButtonGroup>
          </DialogActions>
        )}
        <DialogActions
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: isMaxSm ? 1 : 4,
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
          {!isMaxSm && (
            <ButtonGroup>
              <Button
                disabled={disableMoveLeft}
                startIcon={<ArrowBackIcon />}
                onClick={onMoveLeft}
              >
                Move Left
              </Button>
              <Button
                disabled={disableMoveRight}
                startIcon={<ArrowForwardIcon />}
                onClick={onMoveRight}
              >
                Move Right
              </Button>
            </ButtonGroup>
          )}
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            variant="contained"
            onClick={onRemove}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogMediaEdit;
