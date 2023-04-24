import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import {
  getProject,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  changePosition,
  setTitle,
  setDescription,
  selectDescription,
  clearDescriptionList,
  setColor,
  createProject,
  editProject,
} from "actions/admin/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import OutlinedMoveItemList from "components/OutlinedMoveItemList";
import DisplayProjectImage from "components/DisplayProjectImage";
import DialogColorPicker from "components/dialogs/DialogColorPicker";
import DescriptionInput from "components/DescriptionInput";
import OutlinedColorPicker from "components/OutlinedColorPicker";
import MediaOrderedInput from "components/MediaOrderedInput";
import Footer from "components/Footer";

const ProjectSettingsScreen = ({
  colorDialog,
  positions,
  positionIndex,
  position,
  title,
  descriptionList,
  descriptionSelectIndex,
  colors,
  mediaList,
  // actions
  getProject,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  changePosition,
  setTitle,
  setDescription,
  selectDescription,
  clearDescriptionList,
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
  }, [isNewProject, getProject, projectId]);

  // for outline color
  const [isHover, setIsHover] = useState(false);
  const outlineColor = isHover
    ? theme.custom.colors.outlineHover
    : theme.custom.colors.outline;

  // select one image from a multi-field media object
  const imagesList =
    mediaList === null
      ? null
      : mediaList.map(({ displayType, coverUrl, clientLocalUrl, serverUrl }) =>
          displayType !== "image" ? coverUrl : clientLocalUrl || serverUrl
        );

  const movePositionItems = [
    {
      position: positions?.[positionIndex - 2]?.position,
      title: positions?.[positionIndex - 2]?.title,
    },
    {
      position: positions?.[positionIndex - 1]?.position,
      title: positions?.[positionIndex - 1]?.title,
    },
    {
      position: positions?.[positionIndex]?.position,
      title,
      isHighlighted: true,
      onMoveUp: () => changePosition("next", positionIndex, positions),
      onMoveDown: () => changePosition("previous", positionIndex, positions),
    },
    {
      position: positions?.[positionIndex + 1]?.position,
      title: positions?.[positionIndex + 1]?.title,
    },
    {
      position: positions?.[positionIndex + 2]?.position,
      title: positions?.[positionIndex + 2]?.title,
    },
  ];

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
            {/* Page Title */}
            <Typography
              variant={theme.custom.muiProps.largeTitleVariant}
              sx={{ marginBottom: theme.spacing(2) }}
            >
              {isNewProject ? "New Project" : "Edit Project"}
            </Typography>

            {
              /* Position*/
              !isNewProject && (
                <div
                  style={{
                    width: "100%",
                    marginTop: theme.spacing(3),
                  }}
                >
                  <OutlinedMoveItemList items={movePositionItems} />
                </div>
              )
            }
          </Container>

          {/* First Media & Colors Preview */}
          <div
            style={{
              marginBottom: theme.spacing(6),
            }}
          >
            <Container maxWidth="md">
              <Typography
                sx={{ ...theme.custom.styles.inputLabel, paddingLeft: 0 }}
              >
                Preview
              </Typography>
            </Container>

            <DisplayProjectImage
              imageUrl={imagesList?.[0]}
              color1={colors?.[0]}
              color2={colors?.[1]}
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
            {/* Colors*/}
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

            {/* Title */}
            <TextField
              label="Title"
              value={title}
              fullWidth
              onChange={(event) => setTitle(event.target.value)}
            />

            {/* Description */}
            <DescriptionInput
              selectIndex={descriptionSelectIndex}
              descriptionList={descriptionList}
              images={imagesList}
              selectDescription={selectDescription}
              setDescription={(selectIndex, newEditorState) =>
                setDescription(selectIndex, newEditorState)
              }
              clearDescriptionList={clearDescriptionList}
            />

            {/* Media */}
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

            {/* Submit Button*/}
            <Button
              startIcon={<CheckIcon />}
              onClick={() =>
                isNewProject
                  ? createProject(
                      colors,
                      title,
                      descriptionList,
                      mediaList,
                      () => navigate("/")
                    )
                  : editProject(
                      projectId,
                      position,
                      colors,
                      title,
                      descriptionList,
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
  const {
    colorDialog,
    positions,
    positionIndex,
    position,
    title,
    descriptionList,
    descriptionSelectIndex,
    colors,
    mediaList,
  } = state.project;
  return {
    colorDialog,
    positions,
    positionIndex,
    position,
    title,
    descriptionList,
    descriptionSelectIndex,
    colors,
    mediaList,
  };
};

export default connect(mapState, {
  getProject,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  changePosition,
  setTitle,
  setDescription,
  selectDescription,
  clearDescriptionList,
  setColor,
  createProject,
  editProject,
})(ProjectSettingsScreen);
