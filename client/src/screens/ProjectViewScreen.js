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
import { Editor, EditorState } from "draft-js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import Carousel from "react-material-ui-carousel";
import { connect } from "react-redux";

import { getProject, downloadProjectFile } from "actions/projects";
import { removeProject } from "actions/admin/projects";
import getMedia from "helpers/getMedia";
import useWindowDimensions from "hooks/useWindowDimensions";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import ProjectButtons from "components/ProjectButtons";
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
      {mediaUrls.length === 0 && (
        <div
          style={{
            marginBottom: 50,
            width: width,
          }}
        >
          <Container sx={{ fontSize: isMobile ? 22 : 30 }}>
            <Editor
              editorState={description || EditorState.createEmpty()}
              readOnly={true}
            />
          </Container>
        </div>
      )}
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
                <Container sx={{ fontSize: isMobile ? 22 : 30 }}>
                  <Editor
                    editorState={description || EditorState.createEmpty()}
                    readOnly={true}
                  />
                </Container>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const icons = {
  PlayArrow: <PlayArrowIcon />,
  Download: <DownloadIcon />,
  GitHub: <GitHubIcon />,
};

const ProjectViewScreen = ({
  isAdminLoggedIn,
  project,
  getProject,
  removeProject,
  downloadProjectFile,
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
          <div style={{ width }}>
            <Container>
              <Typography
                variant={theme.custom.muiProps.largeTitleVariant}
                sx={{
                  fontSize: 40,
                  marginTop: theme.spacing(2),
                  marginBottom: theme.spacing(6),
                }}
              >
                {project.title || ""}
              </Typography>
              {
                // Admin Buttons
                isAdminLoggedIn && (
                  <ProjectButtons
                    styleContainer={{
                      marginTop: theme.spacing(3),
                      marginBottom: theme.spacing(3),
                    }}
                    styleButton={{
                      background:
                        "linear-gradient(30deg, rgb(245, 239, 251) 0%, rgb(239, 242, 252) 100%)",
                    }}
                    buttonVariant="outlined"
                    buttons={[
                      {
                        label: "Edit Project",
                        icon: <EditIcon />,
                        onClick: () => navigate(`/edit-project/${projectId}`),
                      },
                      {
                        label: "Remove Project",
                        icon: <DeleteIcon />,
                        onClick: () =>
                          removeProject(projectId, () => navigate("/")),
                      },
                    ]}
                  />
                )
              }
              {
                // Normal User Buttons
                //(project.links?.length > 0 ||
                //  project.downloadFiles?.length > 1) && (
              }
              <ProjectButtons
                styleContainer={{
                  marginTop: isAdminLoggedIn
                    ? theme.spacing(3)
                    : theme.spacing(3),
                }}
                buttonVariant="outlined"
                buttons={[
                  {
                    label: "Run Demo",
                    icon: icons["PlayArrow"],
                    onClick: () =>
                      (window.location.href = "https://google.com"), // test only
                  },
                  {
                    label: "Download",
                    icon: icons["Download"],
                    onClick: () =>
                      downloadProjectFile(projectId, "anImage.jpg"),
                  },
                  {
                    label: "GitHub Repo",
                    icon: icons["GitHub"],
                  },
                ]}
              />
            </Container>
          </div>
          <div style={{ marginTop: theme.spacing(8), width: "100%" }}>
            {/* Description is in Media component*/}
            <Media
              description={project.description}
              colors={project.colors}
              mediaUrls={mediaUrls}
              dimensionProps={dimensionProps}
            />
          </div>
        </div>
      </Content>
      <Footer
        maxWidth={
          isMobile
            ? // mobile
              windowWidth * 0.9 + 50
            : // desktop
            mediaUrls.length > 1
            ? // make it equal to image above it
              maxImgWidth + 50
            : // make it equal to text above it
              maxImgWidth - 0
        }
      />
    </Screen>
  );
};

const mapState = (state) => {
  const { isAdminLoggedIn } = state.adminAuth;
  const { project } = state;
  return { isAdminLoggedIn, project };
};

export default connect(mapState, {
  getProject,
  removeProject,
  downloadProjectFile,
})(ProjectViewScreen);
