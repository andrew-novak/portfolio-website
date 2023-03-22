import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Box, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import { getIntro } from "actions/intro";
import {
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  openImageDialog,
  closeImageDialog,
  setColor,
  setImage,
  setText,
  setIntro,
} from "actions/admin/intro";
import useWindowDimensions from "hooks/useWindowDimensions";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import DialogColorPicker from "components/dialogs/DialogColorPicker";
import DialogImageCrop from "components/dialogs/DialogImageCrop";
import Intro from "components/Intro";
import OutlinedColorPicker from "components/OutlinedColorPicker";
import OutlinedSingleMediaInput from "components/OutlinedSingleMediaInput";
import Footer from "components/Footer";

const IntroSettingsScreen = ({
  dimensionProps,
  dialogColor,
  dialogImage,
  colors,
  image,
  text,
  // actions
  getIntro,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  openImageDialog,
  closeImageDialog,
  setColor,
  setImage,
  setText,
  setIntro,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 700;

  useEffect(() => {
    getIntro();
  }, [getIntro]);

  //align={isMobile ? "center" : "left"}

  return (
    <Screen>
      <NavBar />
      <Content>
        <Container
          maxWidth="md"
          sx={{
            paddingTop: theme.spacing(5),
            ...(isMobile && { maxWidth: 400 }),
          }}
        >
          <Typography
            variant={theme.custom.muiProps.largeTitleVariant}
            sx={{ paddingBottom: theme.spacing(3) }}
          >
            Edit Intro
          </Typography>
          <Typography
            sx={{ ...theme.custom.styles.inputLabel, paddingLeft: 0 }}
          >
            Preview
          </Typography>
        </Container>
        <DialogColorPicker
          dialogTitle={`Picking a ${
            dialogColor.index === 0
              ? "primary"
              : dialogColor.index === 1
              ? "secondary"
              : null
          } color`}
          isOpen={!!dialogColor.color}
          color={dialogColor.color}
          onColorChange={(newColor) => setDialogColor(newColor)}
          onCancel={closeColorDialog}
          onConfirm={(color) =>
            setColor(dialogColor.index, color, closeColorDialog)
          }
        />
        <DialogImageCrop
          dialogTitle="Uploading an intro image"
          isOpen={!!dialogImage}
          fileObjectUrl={dialogImage}
          onCancel={closeImageDialog}
          onConfirm={(croppedImageUrl) =>
            setImage(croppedImageUrl, closeImageDialog)
          }
        />
        <Intro hideEditButton={true} />
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
              <div
                style={{
                  width: "100%",
                  maxWidth: isMobile && 400,
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing(3),
                }}
              >
                <TextField
                  label="Text"
                  value={text}
                  fullWidth
                  multiline
                  onChange={(event) => setText(event.target.value)}
                />
                <OutlinedColorPicker
                  label="Primary Color"
                  color={colors[0]}
                  onClick={() => openColorDialog(0, colors[0])}
                />
                <OutlinedColorPicker
                  label="Secondary Color"
                  color={colors[1]}
                  onClick={() => openColorDialog(1, colors[1])}
                />
              </div>
              <OutlinedSingleMediaInput
                title="Image"
                image={image.serverUrl || image.clientLocalUrl}
                onFileUpload={(event) => openImageDialog(event.target.files)}
              />
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: isMobile && 400,
                margin: "auto",
              }}
            >
              <Button
                startIcon={<CheckIcon />}
                sx={
                  {
                    /* margin: isMobile && "auto" */
                  }
                }
                onClick={() =>
                  setIntro(text, colors, image, () => navigate("/"))
                }
              >
                Submit
              </Button>
            </div>
          </Container>
        </div>
      </Content>
      <Footer maxWidth={isMobile ? 400 : "md"} />
    </Screen>
  );
};

const mapState = (state) => {
  const { dialogColor, dialogImage, colors, image, text } = state.intro;
  return {
    dialogColor,
    dialogImage,
    colors,
    image,
    text,
  };
};

export default connect(mapState, {
  getIntro,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  openImageDialog,
  closeImageDialog,
  setColor,
  setImage,
  setText,
  setIntro,
})(IntroSettingsScreen);
