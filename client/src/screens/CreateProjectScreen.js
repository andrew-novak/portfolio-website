import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";

import createProject from "actions/admin/projectCreateEdit/createProject";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";
import MediaOrderedInput from "components/MediaOrderedInput";
import { setTitle, setDescription } from "actions/admin/projectCreateEdit";

const CreateProjectScreen = ({
  title,
  description,
  mediaList,
  setTitle,
  setDescription,
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
            <Typography variant="h3">New Project</Typography>
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
              onClick={() => createProject(title, description, mediaList)}
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
  const { title, description, mediaList } = state.projectCreateEdit;
  return { title, description, mediaList };
};

export default connect(mapState, {
  setTitle,
  setDescription,
  createProject,
})(CreateProjectScreen);
