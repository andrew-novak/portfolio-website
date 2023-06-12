import { useTheme, Box, Typography, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import useWindowDimensions from "hooks/useWindowDimensions";
import OutlinedFormButton from "./OutlinedFormButton";

const OutlinedSingleMediaInput = ({
  title,
  image,
  onFileRemove,
  onFileUpload,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const theme = useTheme();
  return (
    <Box sx={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "solid 1px",
          borderColor: theme.custom.colors.outline,
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        }}
      >
        <Typography
          align="center"
          sx={{
            ...theme.custom.styles.inputLabel,
            padding: theme.custom.cssProps.outlinePadding,
          }}
        >
          Image
        </Typography>
        <OutlinedFormButton label={<DeleteIcon />} onClick={onFileRemove} />
      </div>
      <Box
        sx={{
          paddingTop: "100%",
          width: windowWidth < 450 ? windowWidth - 34 : 400,
          backgroundColor: "white",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderLeft: "solid 1px",
          borderRight: "solid 1px",
          borderColor: theme.custom.colors.outline,
        }}
      />
      <Button
        fullWidth
        component="label"
        startIcon={<FileUploadIcon />}
        sx={{
          padding: theme.custom.cssProps.outlinePadding,
          border: "solid 1px",
          borderColor: theme.custom.colors.outline,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          "&:hover": {
            borderColor: theme.custom.colors.outlineHover,
          },
        }}
      >
        Upload File
        <input type="file" hidden onChange={onFileUpload} />
      </Button>
    </Box>
  );
};

export default OutlinedSingleMediaInput;
