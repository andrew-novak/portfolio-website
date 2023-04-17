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
      <div
        style={{
          display: "flex",
          borderBottom: `solid 1px ${outlineColor}`,
        }}
      >
        <Typography
          noWrap
          sx={{
            ...theme.custom.styles.inputLabel,
            width: 90,
            borderRight: `solid 1px ${outlineColor}`,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          Position
        </Typography>
        <Typography
          noWrap
          sx={{
            ...theme.custom.styles.inputLabel,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          Title
        </Typography>
      </div>
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
          <div style={{ display: "flex" }}>
            <div
              style={{ width: 90, borderRight: `solid 1px ${outlineColor}` }}
            >
              <Typography
                noWrap
                sx={{
                  ...theme.custom.styles.inputLabel,
                  paddingTop: 1,
                  paddingBottom: 1,
                }}
              >
                {item.position}&nbsp;
              </Typography>
            </div>
            <Typography
              noWrap
              sx={{
                ...theme.custom.styles.inputLabel,
                paddingTop: 1,
                paddingBottom: 1,
              }}
            >
              {item.title}&nbsp;
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              paddingRight: 5,
            }}
          >
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
