import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import {
  setTitle,
  setDescription,
  createProject,
  editProject,
} from "actions/admin/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";
import MediaOrderedInput from "components/MediaOrderedInput";

const ProjectSettingsScreen = ({
  id,
  title,
  description,
  mediaList,
  setTitle,
  setDescription,
  createProject,
  editProject,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNewProject = !id;
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
            <Typography variant="h3">
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
              onChange={(event) => setDescription(event.target.value)}
            />
            <Typography>Media:</Typography>
            <MediaOrderedInput />
            <Button
              startIcon={<CheckIcon />}
              onClick={() =>
                isNewProject
                  ? createProject(title, description, mediaList, () =>
                      navigate("/")
                    )
                  : editProject(id, title, description, mediaList, () =>
                      navigate("/")
                    )
              }
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
  const { id, title, description, mediaList } = state.projectSettings;
  return { id, title, description, mediaList };
};

export default connect(mapState, {
  setTitle,
  setDescription,
  createProject,
  editProject,
})(ProjectSettingsScreen);
