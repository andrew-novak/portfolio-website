import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { connect } from "react-redux";

import { editIntro } from "actions/admin/intro";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import GeometryPattern from "components/GeometryPattern";
import Footer from "components/Footer";

const Intro = ({ isPreview, isAdminLoggedIn, image, text, editIntro }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#e6d49e",
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          display: "flex",
          position: "relative",
        }}
      >
        <GeometryPattern color1="#393939" color2="#e6d49e" />
        <div style={{ display: "flex", translate: "-80px 35px" }}>
          <div
            style={{
              height: 200,
              width: 200,
              borderRadius: "100%",
              background: "white",
              backgroundImage: `url(${image})`,
              marginRight: 16,
            }}
          />

          <Typography variant="p" sx={{ fontSize: 30 }}>
            {text}
          </Typography>
        </div>
        <div
          style={{
            marginTop: theme.spacing(3),
            position: "absolute",
            display: "flex",
            justifyContent: "flex-end",
            maxWidth: "calc(100vw - 20px)",
            width: "100%",
          }}
        >
          {isAdminLoggedIn && (
            <Button
              disabled={isPreview}
              startIcon={<EditIcon />}
              onClick={() => navigate("/edit-intro")}
            >
              Edit Intro
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

const mapState = (state) => {
  const { isAdminLoggedIn } = state.adminAuth;
  const { image, text } = state.intro;
  return { isAdminLoggedIn, image, text };
};

export default connect(mapState, {
  editIntro,
})(Intro);
