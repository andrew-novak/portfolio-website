import { Box, Typography } from "@mui/material";

const CategoryTags = ({ tags, fontSize }) => {
  if (!tags || tags.length < 1) {
    return null;
  }
  return (
    <div>
      {tags.map((tag, index) => (
        <Box
          sx={{
            display: "inline-block",
            paddingTop: 0,
            paddingBottom: 0,
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Typography sx={{ fontSize: fontSize || 16 }}>
            {index > 0 && "\u00A0/\u00A0"}
            {tag}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default CategoryTags;
