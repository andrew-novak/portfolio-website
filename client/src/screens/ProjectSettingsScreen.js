import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import {
  // form
  changePosition,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  setColor,
  setTitle,
  setDescription,
  selectDescription,
  clearDescriptionList,
  openButtonDialog,
  closeButtonDialog,
  setDialogButton,
  setButton,
  // requests
  getProject,
  createProject,
  editProject,
} from "actions/admin/projects";
import { runProjectButton } from "actions/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import OutlinedMoveItemList from "components/OutlinedMoveItemList";
import DisplayProjectImage from "components/DisplayProjectImage";
import DialogColorPicker from "components/dialogs/DialogColorPicker";
import OutlinedColorPicker from "components/OutlinedColorPicker";
import OutlinedDescriptionInput from "components/OutlinedDescriptionInput";
import OutlinedMediaGridInput from "components/OutlinedMediaGridInput";
import DialogProjectButton from "components/dialogs/DialogProjectButton";
import OutlinedProjectButtonsTable from "components/OutlinedProjectButtonsTable";
import DialogProgressList from "components/dialogs/DialogProgressList";
import Footer from "components/Footer";

const ProjectSettingsScreen = ({
  // state - dialogs
  colorDialog,
  buttonDialog,
  submissionDialog,
  // state - fields
  positions,
  positionIndex,
  position,
  colors,
  title,
  descriptionList,
  descriptionSelectIndex,
  mediaList,
  buttons,
  // actions - form
  changePosition,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  setColor,
  setTitle,
  setDescription,
  selectDescription,
  clearDescriptionList,
  openButtonDialog,
  closeButtonDialog,
  setDialogButton,
  setButton,
  runProjectButton,
  // actions - requests
  getProject,
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
              marginTop: theme.spacing(3),
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
            {/* Colors */}
            {/* TODO: Try to make the dialog color picker bigger */}
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
            <OutlinedDescriptionInput
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
            {/* This component has its onw redux mappings */}
            <OutlinedMediaGridInput />

            {/* Project Buttons */}
            <DialogProjectButton
              dialogTitle={`Project button index ${buttonDialog.index}`}
              isOpen={typeof buttonDialog.index === "number"}
              button={buttonDialog.button}
              onChange={(button) => setDialogButton(button)}
              onCancel={closeButtonDialog}
              onConfirm={(button) =>
                setButton(buttonDialog.index, button, closeButtonDialog)
              }
            />
            <OutlinedProjectButtonsTable
              buttons={buttons}
              onCreate={() => openButtonDialog((buttons || []).length)}
              onRun={(index) => runProjectButton(projectId, buttons[index])}
              onEdit={(index) => openButtonDialog(index, buttons[index])}
              onRemove={(index) => setButton(index, "remove")}
            />

            {/* Submition*/}
            <DialogProgressList
              dialogTitle="Project Submission"
              isOpen={submissionDialog.isOpen}
              progressList={[
                {
                  label: "Creating Project",
                  status: submissionDialog.projectCreationProgress,
                },
                {
                  label: "Uploading Button Files",
                  status: submissionDialog.buttonFilesUploadProgress,
                },
              ]}
            />
            <Button
              startIcon={<CheckIcon />}
              onClick={() =>
                isNewProject
                  ? createProject({
                      colors,
                      title,
                      descriptionList,
                      mediaList,
                      buttons,
                      onSuccessRedirect: () => navigate("/"),
                    })
                  : editProject({
                      id: projectId,
                      position,
                      colors,
                      title,
                      descriptionList,
                      mediaList,
                      buttons,
                      onSuccessRedirect: () => navigate("/"),
                    })
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
    // dialogs
    colorDialog,
    buttonDialog,
    submissionDialog,
    // fields
    positions,
    positionIndex,
    position,
    colors,
    title,
    descriptionList,
    descriptionSelectIndex,
    mediaList,
    buttons,
  } = state.project;
  return {
    // dialogs
    colorDialog,
    buttonDialog,
    submissionDialog,
    // fields
    positions,
    positionIndex,
    position,
    colors,
    title,
    descriptionList,
    descriptionSelectIndex,
    mediaList,
    buttons,
  };
};

export default connect(mapState, {
  // form
  changePosition,
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  setColor,
  setTitle,
  setDescription,
  selectDescription,
  clearDescriptionList,
  openButtonDialog,
  closeButtonDialog,
  setDialogButton,
  setButton,
  runProjectButton,
  // requests
  getProject,
  createProject,
  editProject,
})(ProjectSettingsScreen);
