import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import { getProject } from "actions/projects";
import {
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  setTitle,
  setDescription,
  setColor,
  createProject,
  editProject,
} from "actions/admin/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import DialogColorPicker from "components/dialogs/DialogColorPicker";
import DisplayProjectImage from "components/DisplayProjectImage";
import OutlinedColorPicker from "components/OutlinedColorPicker";
import MediaOrderedInput from "components/MediaOrderedInput";
import Footer from "components/Footer";

const ProjectSettingsScreen = ({
  colorDialog,
  title,
  description,
  colors,
  mediaList,
  getProject,
  // actions
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  setTitle,
  setDescription,
  setColor,
  createProject,
  editProject,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { projectId } = useParams();
  const isNewProject = !projectId;
  useEffect(() => {
    if (!isNewProject) {
      getProject(projectId);
    }
  }, [getProject, projectId]);

  // for outline color
  const [isHover, setIsHover] = useState(false);
  const outlineColor = isHover
    ? theme.custom.colors.outlineHover
    : theme.custom.colors.outline;

  return (
    <Screen>
      <NavBar />
      <Content>
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
            <Typography variant={theme.custom.muiProps.largeTitleVariant}>
              {isNewProject ? "New Project" : "Edit Project"}
            </Typography>
            <Typography
              sx={{ ...theme.custom.styles.inputLabel, paddingLeft: 0 }}
            >
              Preview
            </Typography>
          </Container>

          <div
            style={{
              marginBottom: theme.spacing(6),
            }}
          >
            <DisplayProjectImage
              imageUrl={mediaList[0]?.clientLocalUrl || mediaList[0]?.serverUrl}
              color1={colors[0]}
              color2={colors[1]}
            />
          </div>

          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: theme.spacing(3),
            }}
          >
            <DialogColorPicker
              dialogTitle={`Picking a color ${colorDialog.index}`}
              isOpen={
                !!(typeof colorDialog.index === "number" && colorDialog.color)
              }
              color={colorDialog.color}
              onColorChange={(color) => setDialogColor(color)}
              onCancel={closeColorDialog}
              onConfirm={(color) =>
                setColor(colorDialog.index, color, closeColorDialog)
              }
            />
            <TextField
              label="Title"
              value={title}
              fullWidth
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              label="Description"
              value={description}
              fullWidth
              multiline
              onChange={(event) => setDescription(event.target.value)}
            />
            <OutlinedColorPicker
              label="Color 0"
              color={colors[0]}
              fullWidth
              onClick={() => openColorDialog(0, colors[0])}
            />
            <OutlinedColorPicker
              label="Color 1"
              color={colors[1]}
              fullWidth
              onClick={() => openColorDialog(1, colors[1])}
            />

            <Container
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              disableGutters
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                border: `solid 1px ${outlineColor}`,
                borderTopLeftRadius: theme.custom.cssProps.outlineBorderRadius,
                borderTopRightRadius: theme.custom.cssProps.outlineBorderRadius,
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderBottom: `solid 1px ${outlineColor}`,
                }}
              >
                <Typography sx={theme.custom.styles.inputLabel}>
                  Media
                </Typography>
              </div>
              <div style={{ width: "100%" }}>
                <MediaOrderedInput projectId={projectId} />
              </div>
            </Container>
            <Button
              startIcon={<CheckIcon />}
              onClick={() =>
                isNewProject
                  ? createProject(title, description, colors, mediaList, () =>
                      navigate("/")
                    )
                  : editProject(
                      projectId,
                      title,
                      description,
                      colors,
                      mediaList,
                      () => navigate("/")
                    )
              }
            >
              Submit
            </Button>
          </Container>
        </div>
      </Content>
      <Footer maxWidth="md" />
    </Screen>
  );
};

const mapState = (state) => {
  const { colorDialog, title, description, colors, mediaList } = state.project;
  return { colorDialog, title, description, colors, mediaList };
};

export default connect(mapState, {
  getProject,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  setTitle,
  setDescription,
  setColor,
  createProject,
  editProject,
})(ProjectSettingsScreen);
