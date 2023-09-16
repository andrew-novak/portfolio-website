import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import { Editor } from "draft-js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import { connect } from "react-redux";

import { getProject, runProjectButton } from "actions/projects";
import { removeProject } from "actions/admin/projects";
import useWindowDimensions from "hooks/useWindowDimensions";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import CategoryTags from "components/CategoryTags";
import FeatureTags from "components/FeatureTags";
import ProjectButtons from "components/ProjectButtons";
import DisplayProjectMedia from "components/DisplayProjectMedia";
import Footer from "components/Footer";

const Segments = ({
  colors,
  descriptionList,
  mediaList,
  dimensionProps,
  anyButtons,
}) => {
  const theme = useTheme();

  const mediaUrls = !mediaList ? null : mediaList.map((obj) => obj.serverUrl);

  const { width: textContainerWidth, isMobile, isVeryMobile } = dimensionProps;

  const segmentsCount = Math.max(
    descriptionList?.length || 0,
    mediaUrls?.length || 0
  );

  return (
    /* All Sections */
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: anyButtons ? theme.spacing(5.5) : theme.spacing(7),
      }}
    >
      {/* One Segment */}
      {Array(segmentsCount)
        .fill(null)
        .map((_, index) => {
          const color1 = index === 0 && colors[0];
          const color2 = index === 0 && colors[1];
          return (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(4),
                marginBottom: theme.spacing(8),
              }}
            >
              {/* One Description */}
              {descriptionList[index] && (
                <Container
                  sx={{
                    width: textContainerWidth,
                    fontSize: isMobile ? 22 : 30,
                    //marginTop: theme.spacing(4),
                    //marginBottom: theme.spacing(4),
                    // if last segment and without media
                    marginBottom:
                      index < segmentsCount &&
                      mediaUrls[index] != null &&
                      theme.spacing(4),
                  }}
                >
                  <Editor
                    editorState={descriptionList[index]}
                    readOnly={true}
                  />
                </Container>
              )}
              {/* One Media */}
              {mediaList[index] && (
                <div style={{ width: "100%" }}>
                  <DisplayProjectMedia
                    media={mediaList[index]}
                    color1={color1}
                    color2={color2}
                  />
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
  runProjectButton,
}) => {
  const theme = useTheme();
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProject(projectId);
  }, [getProject, projectId]);

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

  const anyButtons = isAdminLoggedIn || project.buttons?.length > 0;

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
              <div
                style={{
                  marginTop: theme.spacing(4),
                  //marginBottom: theme.spacing(8),
                }}
              >
                <Typography
                  variant={theme.custom.muiProps.largeTitleVariant}
                  sx={{
                    fontSize: 40,
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {project.title || ""}
                </Typography>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 5 }}
                >
                  <CategoryTags tags={project.categoryTags} fontSize={20} />
                  <FeatureTags tags={project.featureTags} />
                </div>
              </div>
              {/* All Buttons */}
              {anyButtons && (
                <div
                  style={{
                    marginTop: theme.spacing(7),
                  }}
                >
                  {
                    // Admin Buttons
                    isAdminLoggedIn && (
                      <ProjectButtons
                        styleContainer={{}}
                        styleButton={{
                          background: theme.custom.colors.neutralGradient,
                        }}
                        buttonVariant="outlined"
                        buttons={[
                          {
                            label: "Edit Project",
                            icon: <EditIcon />,
                            onClick: () =>
                              navigate(`/edit-project/${projectId}`),
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
                    styleContainer={{}}
                    buttonVariant="outlined"
                    buttons={(project.buttons || []).map((button) => ({
                      icon: icons[button.icon],
                      label: button.label,
                      onClick: () => runProjectButton(project.id, button),
                    }))}
                  />
                </div>
              )}
            </Container>
          </div>
          {/* segments of media & descriptions */}
          <Segments
            colors={project.colors}
            descriptionList={project.descriptionList}
            mediaList={project.mediaList}
            dimensionProps={dimensionProps}
            anyButtons={anyButtons}
          />
        </div>
      </Content>
      <Footer
        maxWidth={
          isMobile
            ? // mobile
              windowWidth * 0.9 + 50
            : // desktop
            project.mediaList?.length > 1
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
  runProjectButton,
})(ProjectViewScreen);
