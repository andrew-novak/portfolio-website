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
import useWindowDimensions from "hooks/useWindowDimensions";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import DisplayProjectImage from "components/DisplayProjectImage";
import Footer from "components/Footer";

const Media = ({ description, colors, mediaUrls, dimensionProps }) => {
  const theme = useTheme();
  const { height, width, isMobile, isVeryMobile } = dimensionProps;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {mediaUrls.map((url, index) => {
        const color1 = index === 0 ? colors[0] : null;
        const color2 = index === 0 ? colors[1] : null;
        return (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: isVeryMobile ? 20 : 50,
            }}
          >
            <DisplayProjectImage
              imageUrl={url}
              color1={color1}
              color2={color2}
            />
            {description && index === 0 && (
              <div
                style={{
                  marginTop: 50,
                  marginBottom: isVeryMobile ? 30 : 0,
                  width: width,
                }}
              >
                <Container>
                  <Typography
                    align="center"
                    variant="p"
                    sx={{ fontSize: isMobile ? 25 : 30 }}
                  >
                    {description || ""}
                  </Typography>
                </Container>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ProjectViewScreen = ({
  isAdminLoggedIn,
  project,
  getProject,
  removeProject,
}) => {
  const theme = useTheme();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { width: windowWidth } = useWindowDimensions();
  const maxImgWidth = 800;
  const fullScreenImageWidth = 600;
  const isMobile = windowWidth * 0.9 < maxImgWidth;
  const isVeryMobile = windowWidth < fullScreenImageWidth;
  const width = isVeryMobile ? "100%" : isMobile ? "90%" : maxImgWidth;
  const height = isVeryMobile
    ? windowWidth
    : isMobile
    ? windowWidth * 0.9
    : maxImgWidth;
  const dimensionProps = {
    maxImgWidth,
    fullScreenImageWidth,
    isMobile,
    isVeryMobile,
    width,
    height,
  };

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
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant={theme.custom.muiProps.largeTitleVariant}
            sx={{ fontSize: 40, marginBottom: theme.spacing(3) }}
          >
            {project.title || ""}
          </Typography>
          {/* Admin Buttons */}
          {isAdminLoggedIn && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: theme.spacing(3),
              }}
            >
              <Button
                startIcon={<EditIcon />}
                onClick={() => navigate(`/edit-project/${projectId}`)}
              >
                Edit Project
              </Button>
              <div style={{ width: 20 }} />
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => removeProject(projectId, () => navigate("/"))}
              >
                Remove Project
              </Button>
            </div>
          )}
          {/* Description is in Media component*/}
          <Media
            description={project.description}
            colors={project.colors}
            mediaUrls={mediaUrls}
            dimensionProps={dimensionProps}
          />
        </div>
      </Content>
      <Footer maxWidth={isMobile ? windowWidth * 0.9 + 50 : maxImgWidth + 50} />
    </Screen>
  );
};

const mapState = (state) => {
  const { isAdminLoggedIn } = state.adminAuth;
  const { project } = state;
  return { isAdminLoggedIn, project };
};

export default connect(mapState, { getProject, removeProject })(
  ProjectViewScreen
);
