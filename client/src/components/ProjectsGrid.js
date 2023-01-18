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

import getMedia from "helpers/getMedia";
import { shouldDisplayImage, shouldDisplayVideo } from "helpers/fileTypes";
import getVideoCover from "helpers/getVideoCover";

const ProjectsGrid = ({ projects, cardHeightPercentRatio }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={1}>
      {projects.map((project, index) => {
        if (project.mediaFilenames.length < 1) {
          // TODO: display 'no image' image later on
          return null;
        }
        const filename = project.mediaFilenames[0];
        const extension = filename ? filename.split(".").pop() : null;
        console.log("extension:", extension);
        console.log(shouldDisplayImage(extension));

        const selectImage = () => {
          const mediaUrl = getMedia.oneProjectFileUrl(
            project.id,
            project.mediaFilenames[0]
          );
          if (shouldDisplayImage(extension)) {
            return mediaUrl;
          }
          if (shouldDisplayVideo(extension)) {
            const coverFile = getVideoCover(mediaUrl);
            const coverUrl = URL.createObjectURL(coverFile);
            return coverUrl;
          }
          // the media file is neither an image nor a video
          return "unsupportedFormat";
        };
        const image = selectImage();

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
