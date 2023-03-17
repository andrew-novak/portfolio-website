import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import { getProject } from "actions/projects";
import {
  setTitle,
  setDescription,
  createProject,
  editProject,
} from "actions/admin/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import OutlinedColorPicker from "components/OutlinedColorPicker";
import MediaOrderedInput from "components/MediaOrderedInput";
import Footer from "components/Footer";

const ProjectSettingsScreen = ({
  title,
  description,
  mediaList,
  getProject,
  setTitle,
  setDescription,
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
            <OutlinedColorPicker label="Color 1" fullWidth />
            <OutlinedColorPicker label="Color 2" fullWidth />
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
                  ? createProject(title, description, mediaList, () =>
                      navigate("/")
                    )
                  : editProject(projectId, title, description, mediaList, () =>
                      navigate("/")
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
  const { title, description, mediaList } = state.project;
  return { title, description, mediaList };
};

export default connect(mapState, {
  getProject,
  setTitle,
  setDescription,
  createProject,
  editProject,
})(ProjectSettingsScreen);
