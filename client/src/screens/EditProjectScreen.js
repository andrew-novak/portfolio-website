import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import {
  setTitle,
  setDescription,
  mediaListAdd,
  mediaListSwapPlaces,
} from "actions/admin/projectCreateEdit";
import createProject from "actions/admin/projectCreateEdit/createProject";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";
import MediaOrderedInput from "components/MediaOrderedInput";

const EditProjectScreen = ({
  title,
  description,
  media,
  setTitle,
  setDescription,
  mediaListAdd,
  mediaListSwapPlaces,
  createProject,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

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
            <Typography variant="h3">Edit Project</Typography>
            <TextField
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Typography>Media:</Typography>
            <MediaOrderedInput
              mediaArray={media}
              mediaListAdd={mediaListAdd}
              mediaListSwapPlaces={mediaListSwapPlaces}
            />
            <Button
              startIcon={<CheckIcon />}
              onClick={() => createProject(title, description, media)}
            >
              Submit Changes
            </Button>
          </Container>
        </div>
      </Content>
      <Footer />
    </Screen>
  );
};

const mapState = (state) => {
  const { title, description, media } = state.projectCreateEdit;
  return { title, description, media };
};

export default connect(mapState, {
  setTitle,
  setDescription,
  mediaListAdd,
  mediaListSwapPlaces,
  createProject,
})(EditProjectScreen);
