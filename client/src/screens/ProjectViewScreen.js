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
import useElementDimensions from "hooks/useElementDimensions";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const Media = ({ mediaUrls, description, dimensionProps }) => {
  const theme = useTheme();
  const { parentRef, height, width, isMobile, isVeryMobile } = dimensionProps;
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
        const color1 = "#0085ff";
        const color2 = "#ffd16b";
        return (
          <>
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                height,
                marginBottom: index > 0 ? (isVeryMobile ? 20 : 50) : 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Desktop Colorful Div */}
              {index === 0 && (
                <div
                  style={{
                    position: "absolute",
                    height: "calc(100% - 80px)",
                    width: "100%",
                    background: `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)`,
                  }}
                />
              )}
              {/* Greyish Div */}
              {index !== 0 && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      height: height - 80,
                      width: "100%",
                      background: color1,
                      background: `linear-gradient(30deg, #f8f1ff 0%, #eff2fc 100%)`,
                    }}
                  />
                </>
              )}
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  width,
                  backgroundColor: "white",
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                  boxShadow: isVeryMobile ? 0 : 6,
                }}
              />
            </div>
            {description && index === 0 && (
              <div style={{ marginTop: 40, marginBottom: 40, width: width }}>
                <Container>
                  <Typography
                    align="center"
                    variant="p"
                    sx={{ fontSize: isMobile ? 18 : 24 }}
                  >
                    {description || ""}
                  </Typography>
                </Container>
              </div>
            )}
          </>
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

  const parentRef = useRef(null);
  const { height: parentHeight, width: parentWidth } =
    useElementDimensions(parentRef);
  const maxImgWidth = 800;
  const fullScreenImageWidth = 600;
  const isMobile = parentWidth * 0.9 < maxImgWidth;
  const isVeryMobile = parentWidth < fullScreenImageWidth;
  const width = isVeryMobile ? "100%" : isMobile ? "90%" : maxImgWidth;
  const height = isVeryMobile
    ? parentWidth
    : isMobile
    ? parentWidth * 0.9
    : maxImgWidth;
  const dimensionProps = {
    parentRef,
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
            //paddingBottom: theme.spacing(3),
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
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
          <Media
            mediaUrls={mediaUrls}
            description={project.description}
            dimensionProps={dimensionProps}
          />
        </div>
      </Content>
      <Footer maxWidth={isMobile ? parentWidth * 0.9 + 50 : maxImgWidth + 50} />
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
