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
  editProject,
} from "actions/admin/project";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";
import MediaOrderedInput from "components/MediaOrderedInput";

const EditProjectScreen = ({
  id,
  title,
  description,
  mediaList,
  setTitle,
  setDescription,
  mediaListAdd,
  mediaListSwapPlaces,
  editProject,
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
              mediaList={mediaList}
              mediaListAdd={mediaListAdd}
              mediaListSwapPlaces={mediaListSwapPlaces}
            />
            <Button
              startIcon={<CheckIcon />}
              onClick={() => editProject(id, title, description, mediaList)}
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
  const { id, title, description, mediaList } = state.projectCreateEdit;
  return { id, title, description, mediaList };
};

export default connect(mapState, {
  setTitle,
  setDescription,
  mediaListAdd,
  mediaListSwapPlaces,
  editProject,
})(EditProjectScreen);
