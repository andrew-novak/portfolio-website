import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Image from "mui-image";
import {
  Grid,
  Box,
  CardMedia,
  Container,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Carousel from "react-material-ui-carousel";
import { connect } from "react-redux";

import { getProject } from "actions/projects";
import { removeProject } from "actions/admin/projects";
import getMedia from "helpers/getMedia";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const Media = ({ mediaUrls }) => {
  const theme = useTheme();
  const parentRef = useRef(null);

  return (
    <div
      ref={parentRef}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {mediaUrls.map((url, index) => {
        const width = 800;
        const height = width;
        return (
          <div
            key={index}
            style={{
              width,
              height,
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
            }}
          />
        );
      })}
    </div>
  );
};

const ViewProjectScreen = ({
  isAdminMode,
  project,
  getProject,
  removeProject,
}) => {
  const theme = useTheme();
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProject(projectId);
  }, [getProject, projectId]);

  const mediaUrls = project.mediaList.map((obj) => obj.serverUrl);

  return (
    <Screen>
      <NavBar />
      <Content>
        <div
          style={{
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(3),
            width: "100%",
          }}
        >
          <Container
            maxWidth="xl"
            disableGutters
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
                flexDirection: "row",
                justifyContent: "space-between",
                maxWidth: "calc(100vw - 20px)",
                width: "100%",
              }}
            >
              <Typography variant="h4">{project.title || ""}</Typography>
              {isAdminMode && (
                <div>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/edit-project/${projectId}`)}
                  >
                    Edit Project
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() =>
                      removeProject(projectId, () => navigate("/"))
                    }
                  >
                    Remove Project
                  </Button>
                </div>
              )}
            </div>
            <Media mediaUrls={mediaUrls} />
            {/*media.length > 1 ? (<Slider media={media})*/}
            <Typography variant="h4">{project.description || ""}</Typography>
            <Typography>{JSON.stringify(project, null, 2)}</Typography>
          </Container>
        </div>
      </Content>
      <Footer />
    </Screen>
  );
};

const mapState = (state) => {
  const isAdminMode = state.adminAuth.isLoggedIn;
  const { project } = state;
  return { isAdminMode, project };
};

export default connect(mapState, { getProject, removeProject })(
  ViewProjectScreen
);
