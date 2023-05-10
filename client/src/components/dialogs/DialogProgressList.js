import {
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const DialogProgressList = ({ dialogTitle, isOpen, progressList }) => {
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
            gap: theme.spacing(3),
            padding: theme.spacing(3),
          }}
        >
          {progressList.map((progress, index) =>
            !progress.status ? null : (
              <div
                key={index}
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
                {progress.status === "completed" && (
                  <DoneIcon sx={{ fontSize: 40 }} />
                )}
                <Typography sx={{ fontSize: 20 }}>{progress.label}</Typography>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogProgressList;
