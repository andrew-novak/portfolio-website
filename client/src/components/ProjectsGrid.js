import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  ButtonBase,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";

import getVideoCover from "helpers/getVideoCover";

const ProjectsGrid = ({ projects, cardHeightPercentRatio }) => {
  const navigate = useNavigate();

  const selectImage = (project) => {
    // No media:
    if (project.mediaList.length < 1) {
      return null;
    }

    // Supported format:
    const { serverUrl, displayType } = project.mediaList[0];
    if (displayType === "image") {
      return serverUrl;
    }
    if (displayType === "video") {
      const coverFile = getVideoCover(serverUrl);
      const coverUrl = URL.createObjectURL(coverFile);
      return coverUrl;
    }

    // Unsupported format:
    return "unsupportedFormat";
  };

  return (
    <Grid container spacing={1}>
      {projects.map((project, index) => {
        const image = selectImage(project);
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 0,
                boxShadow: 0,
                //backgroundColor: "rgb(238, 238, 238)",
              }}
            >
              <ButtonBase
                sx={{ display: "block", textAlign: "initial", width: "100%" }}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <CardMedia
                  image={image}
                  sx={{
                    height: 0,
                    paddingTop: cardHeightPercentRatio,
                    position: "relative",
                  }}
                >
                  {
                    // replacement text when no image
                    (image === "unsupportedFormat" || image === null) && (
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
                        {image === "unsupportedFormat" ? (
                          <Typography>
                            Unsupported
                            <br />
                            media
                            <br />
                            type
                          </Typography>
                        ) : (
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
                <CardHeader title={project.title} sx={{ paddingBottom: 0 }} />
                <CardContent sx={{ paddingTop: 1 }}>
                  <Typography>Ipsum...</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProjectsGrid;
