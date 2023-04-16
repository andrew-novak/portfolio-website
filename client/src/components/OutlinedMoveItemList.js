import { useState } from "react";
import { useTheme, Typography, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

/*
items prop example:
[
  { text: "Item A" },
  { text: "Item B" },
  {
    text: "Item C",
    isHighlighted: true,
    onMoveUp: <function>,
    onMoveDown: <function>
  },
  { text: "Item D" },
  { text: "Item E" },
]
*/
const OutlinedMoveItemList = ({ items }) => {
  const theme = useTheme();

  const [isHover, setIsHover] = useState(false);
  const outlineColor = isHover
    ? theme.custom.colors.outlineHover
    : theme.custom.colors.outline;

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        width: "100%",
        borderRadius: "4px",
        border: `solid 1px ${outlineColor}`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom:
              index < items.length - 1 && `solid 1px ${outlineColor}`,
            background:
              item.isHighlighted &&
              `linear-gradient(30deg, #f8f1ff 0%, #eff2fc 100%)`,
          }}
        >
          <Typography sx={theme.custom.styles.inputLabel}>
            {item.text}&nbsp;
          </Typography>
          <div>
            {!!item.onMoveUp && (
              <IconButton onClick={item.onMoveUp}>
                <ArrowUpwardIcon />
              </IconButton>
            )}
            {!!item.onMoveDown && (
              <IconButton onClick={item.onMoveDown}>
                <ArrowDownwardIcon />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutlinedMoveItemList;
