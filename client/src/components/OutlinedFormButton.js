import { useTheme, Button } from "@mui/material";

// originally created for OutlinedDescriptionInput.js
const OutlinedFormButton = ({ startIcon, label, sx, onClick }) => {
  const theme = useTheme();
  return (
    <Button
      startIcon={startIcon}
      variant="outlined"
      sx={{
        ...theme.custom.styles.inputLabel,
        borderColor: theme.custom.colors.outlineLight,
        margin: "4px",
        padding: "10px",
        paddingTop: "4px",
        paddingBottom: "4px",
        minWidth: 40,
        ...sx,
      }}
      onMouseDown={onClick}
    >
      {label}
    </Button>
  );
};

export default OutlinedFormButton;
