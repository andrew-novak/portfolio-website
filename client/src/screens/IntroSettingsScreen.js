import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import { getIntro } from "actions/intro";
import { setImage, setText, editIntro } from "actions/admin/intro";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Intro from "components/Intro";
import Footer from "components/Footer";

const IntroSettingsScreen = ({
  image,
  text,
  getIntro,
  setImage,
  setText,
  editIntro,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    getIntro();
  }, [getIntro]);

  return (
    <Screen>
      <NavBar />
      <Content>
        <Intro isPreview={true} />
        <div
          style={{
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(3),
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: theme.spacing(3),
            }}
          >
            <Typography variant="h3">Edit Intro</Typography>

            <TextField
              label="Text"
              value={text}
              fullWidth
              onChange={(event) => setText(event.target.value)}
            />
            <Button
              startIcon={<CheckIcon />}
              onClick={() => editIntro(image, text, () => navigate("/"))}
            >
              Submit
            </Button>
          </Container>
        </div>
      </Content>
      <Footer />
    </Screen>
  );
};

const mapState = (state) => {
  const { image, text } = state.intro;
  return { image, text };
};

export default connect(mapState, {
  getIntro,
  setImage,
  setText,
  editIntro,
})(IntroSettingsScreen);
