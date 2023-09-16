import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTheme,
  useMediaQuery,
  Grid,
  CircularProgress,
  Card,
  ButtonBase,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import getVideoCover from "helpers/getVideoCover";
import VideoCoverOverlay from "components/VideoCoverOverlay";
import CategoryTags from "components/CategoryTags";
import FeatureTags from "components/FeatureTags";

const ProjectMedia = ({ project, cardHeightPercentRatio, isSm }) => {
  const [image, setImage] = useState("loading");
  const [isImage, setIsImage] = useState(false);

  const theme = useTheme();

  const selectImage = async (project) => {
    // No media:
    if (!project.media) {
      return null;
    }
    // Supported format:
    const { displayType, serverUrl } = project.media;
    if (displayType === "image" || displayType === "gif") return serverUrl;
    if (displayType === "video") {
      const coverFile = await getVideoCover(serverUrl);
      const coverUrl = URL.createObjectURL(coverFile);
      return coverUrl;
    }
    // Unsupported format:
    return "unsupportedFormat";
  };

  useEffect(() => {
    selectImage(project).then((value) => {
      const isImage =
        value !== "loading" && value !== "unsupportedFormat" && value !== null;
      setImage(value);
      setIsImage(isImage);
    });
  }, [project]);

  return (
    <CardMedia
      sx={{
        height: 0,
        paddingTop: cardHeightPercentRatio,
        position: "relative",
        boxShadow: !isSm && 1,
        ...(isSm
          ? {
              borderTop: "1px solid",
              borderBottom: "1px solid",
              borderColor: theme.custom.colors.lightBorder,
            }
          : {}),
      }}
    >
      {isImage && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgb(230, 230, 230)",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
          {project?.media?.displayType === "video" && <VideoCoverOverlay />}
        </>
      )}
      {
        // replacement text container when no image
        !isImage && (
          <div
            style={{
              backgroundColor: "rgb(231, 231, 231)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {image === "loading" ? (
              // loading
              <CircularProgress />
            ) : /*<Typography>Loading...</Typography>*/
            image === "unsupportedFormat" ? (
              // unsupportedFormat
              <Typography>
                Unsupported
                <br />
                media
                <br />
                type
              </Typography>
            ) : (
              // any other case
              <Typography>
                No
                <br />
                media
              </Typography>
            )}
          </div>
        )
      }
    </CardMedia>
  );
};

const ProjectsGrid = ({ isAdmin, projects, cardHeightPercentRatio }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container spacing={isSm ? 5 : 1}>
      {projects?.length < 1 && (
        <div
          style={{
            height: 40,
            display: "flex",
            alignItems: "center",
          }}
        >
          {projects === null ? (
            <CircularProgress size={30} sx={{ marginRight: 2 }} />
          ) : (
            <CloseIcon sx={{ fontSize: 30, marginRight: 1 }} />
          )}
          <Typography sx={{ fontSize: 20 }}>
            {projects === null ? "Loading projects..." : "No projects found"}
          </Typography>
        </div>
      )}
      {projects?.length > 0 &&
        projects.map((project, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  borderRadius: 0,
                  boxShadow: 0,
                  //backgroundColor: "rgb(238, 238, 238)",
                  position: "relative",
                }}
              >
                <ButtonBase
                  sx={{ display: "block", textAlign: "initial", width: "100%" }}
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <ProjectMedia
                    project={project}
                    cardHeightPercentRatio={cardHeightPercentRatio}
                    isSm={isSm}
                  />
                  <CardHeader
                    title={
                      <span style={{ fontWeight: "500" }}>{project.title}</span>
                    }
                    subheader={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        <CategoryTags
                          tags={project.categoryTags}
                          fontSize={18}
                        />
                        <FeatureTags tags={project.featureTags} />
                      </div>
                    }
                    sx={{ paddingBottom: 1 }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: 1,
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        marginBottom: project.featureTags?.length > 0 && 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                        maxHeight: 70,
                      }}
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                </ButtonBase>
                {isAdmin && (
                  <div style={{ position: "absolute", top: 0, right: 0 }}>
                    <IconButton
                      sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        opacity: 0.8,
                        background: "white",
                        "&:hover": {
                          opacity: 1,
                          background: "white",
                        },
                      }}
                      onClick={() => navigate(`/edit-project/${project.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                )}
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ProjectsGrid;
