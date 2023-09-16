import { useTheme, Button } from "@mui/material";

const ProjectButtons = ({
  buttonVariant,
  buttons,
  styleContainer,
  styleButton,
}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: "100%",
        ...styleContainer,
      }}
    >
      {buttons.map(({ label, icon, onClick }, index) => (
        <Button
          key={index}
          variant={buttonVariant}
          startIcon={!!icon && icon}
          sx={{
            ...styleButton,
            marginBottom: theme.spacing(1.5),
            marginRight: index < buttons.length - 1 ? theme.spacing(1.5) : 0,
          }}
          onClick={onClick}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ProjectButtons;
