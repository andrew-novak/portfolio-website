import { useTheme } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";

import { PROJECT_BUTTON_ICONS } from "constants/projects";
import OutlinedIconPicker from "components/OutlinedIconPicker";
import RadioGroupForm from "components/RadioGroupForm";
import UploadFileDropzone from "components/UploadFileDropzone";

const DialogProjectButton = ({
  dialogTitle,
  isOpen,
  button,
  onChange,
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(3),
              width: 400,
            }}
          >
            <OutlinedIconPicker
              buttons={PROJECT_BUTTON_ICONS}
              currentValue={button.icon}
              onClick={(icon) => onChange({ ...button, icon })}
            />
            <TextField
              label="Label"
              value={button.label || ""}
              variant="outlined"
              fullWidth
              onChange={(event) =>
                onChange({ ...button, label: event.target.value })
              }
            />
            <RadioGroupForm
              radios={[
                { label: "Redirect", value: "redirect" },
                { label: "File", value: "file" },
              ]}
              currentValue={button.behaviour}
              onChange={(value) =>
                onChange({
                  ...button,
                  behaviour: value,
                  redirect: null,
                  file: null,
                })
              }
            />
            {button.behaviour === "redirect" && (
              <TextField
                label="Redirect Url"
                value={button.redirect || ""}
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  onChange({ ...button, redirect: event.target.value })
                }
              />
            )}
            {button.behaviour === "file" && (
              <UploadFileDropzone
                filenames={button.file?.path && [button.file.path]}
                style={{ maxHeight: 200 }}
                onDrop={(uploadFiles) => onChange({ ...button, uploadFiles })}
              />
            )}
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
            onClick={() => onConfirm(button)}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogProjectButton;
