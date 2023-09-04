import {
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from '@mui/icons-material/Close';

import CircularProgressWithLabel from "components/CircularProgressWithLabel"

const DialogProgressList = ({ dialogTitle, isOpen, progressList, buttons }) => {
  const theme = useTheme();
  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: {
          //backgroundColor: "transparent",
          //boxShadow: "none",
        },
      }}
    >
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
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            //gap: theme.spacing(3),
            padding: theme.spacing(3),
          }}
        >
          {progressList.map((progress, index) =>
            !progress.status ? null : (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(2),
                  }}
                >
                  {progress.status === "awaiting" && (
                    <div style={{ height: 40, width: 40 }} />
                  )}
                  {progress.status === "pending" && <CircularProgress />}
                  {typeof progress.status === 'number' && (
                    <CircularProgressWithLabel
                      value={progress.status}
                      style={{ height: 40, width: 40 }}
                    />
                  )}
                  {progress.status === "completed" && (
                    <DoneIcon sx={{ fontSize: 40 }} />
                  )}
                  {progress.status === "failed" && (
                    <CloseIcon sx={{ fontSize: 40 }} />
                  )}
                  <Typography sx={{ fontSize: 20 }}>{progress.label}</Typography>
                </div>
                {progress.sublist && (
                  progress.sublist.map((subprogress, subindex) => (
                    <div
                      key={subindex}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 55,
                        gap: theme.spacing(2),
                      }}
                    >
                      {subprogress.status === "awaiting" && (
                        <div style={{ height: 40, width: 40 }} />
                      )}
                      {subprogress.status === "pending" && <CircularProgress />}
                      {typeof subprogress.status === 'number' && (
                        <CircularProgressWithLabel
                          value={subprogress.status}
                          style={{ height: 40, width: 40 }}
                        />
                      )}
                      {subprogress.status === "completed" && (
                        <DoneIcon sx={{ fontSize: 40 }} />
                      )}
                      {subprogress.status === "failed" && (
                        <CloseIcon sx={{ fontSize: 40 }} />
                      )}
                      <Typography sx={{ fontSize: 20 }}>{subprogress.label}</Typography>
                    </div>
                  ))
                )}
              </div>
            )
          )}
        </div>
      </DialogContent>
      {buttons && (
        <DialogActions sx={{ justifyContent: "space-between" }}>
          {buttons.map(({label, onClick}) => (
            <Button variant="contained" onClick={onClick}>{label}</Button>
          ))}
       </DialogActions>
      )}
    </Dialog>
  );
};

export default DialogProgressList;
