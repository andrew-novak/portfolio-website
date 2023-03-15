import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Box, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import { getIntro } from "actions/intro";
import { openImageDialog, closeImageDialog } from "actions/admin/intro";
import { setImage, setText, editIntro } from "actions/admin/intro";
import useWindowDimensions from "hooks/useWindowDimensions";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import DialogImageCrop from "components/MediaOrderedInput/MediaDialogs/DialogImageCrop";
import Intro from "components/Intro";
import MediaSingleInput from "components/MediaSingleInput";
import Footer from "components/Footer";

const IntroSettingsScreen = ({
  dimensionProps,
  dialogImage,
  image,
  text,
  getIntro,
  openImageDialog,
  closeImageDialog,
  setImage,
  setText,
  editIntro,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 700;

  useEffect(() => {
    getIntro();
  }, [getIntro]);

  return (
    <Screen>
      <NavBar />
      <Content>
        <Container
          maxWidth="md"
          sx={{
            paddingTop: theme.spacing(5),
          }}
        >
          <Typography
            variant="h3"
            align={isMobile ? "center" : "left"}
            sx={{ paddingBottom: theme.spacing(3) }}
          >
            Edit Intro
          </Typography>
          <Typography variant="h5" align={isMobile ? "center" : "left"}>
            Preview:
          </Typography>
        </Container>
        <DialogImageCrop
          dialogTitle="Uploading an intro image"
          isOpen={!!dialogImage}
          fileObjectUrl={dialogImage}
          onCancel={closeImageDialog}
          onConfirm={(croppedImageUrl) =>
            setImage(croppedImageUrl, closeImageDialog)
          }
        />
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
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "center" : "flex-start",
                width: "100%",
                gap: theme.spacing(3),
              }}
            >
              <div style={{ width: "100%", maxWidth: isMobile && 400 }}>
                <TextField
                  label="Text"
                  value={text}
                  fullWidth
                  multiline
                  onChange={(event) => setText(event.target.value)}
                />
              </div>
              <MediaSingleInput
                title="Image"
                file={image}
                onFileUpload={(event) => openImageDialog(event.target.files)}
              />
            </div>
            <Button
              startIcon={<CheckIcon />}
              sx={{ margin: isMobile && "auto" }}
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
  const { dialogImage, image, text } = state.intro;
  return { dialogImage, image, text };
};

export default connect(mapState, {
  getIntro,
  openImageDialog,
  closeImageDialog,
  setImage,
  setText,
  editIntro,
})(IntroSettingsScreen);
