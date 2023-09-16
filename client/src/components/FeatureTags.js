import { Box, Typography } from "@mui/material";

const FeatureTags = ({ tags }) => {
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
            paddingLeft: 0.4,
            paddingRight: 0.4,
            border: "1px solid",
            borderRadius: 2,
            marginBottom: 0.5,
            marginRight: index < tags.length && 0.5,
          }}
        >
          <Typography sx={{ fontSize: 13 }}>{tag}</Typography>
        </Box>
      ))}
    </div>
  );
};

export default FeatureTags;
