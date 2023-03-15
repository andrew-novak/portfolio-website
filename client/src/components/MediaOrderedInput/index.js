import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux";

//import useMediaDialog from "./MediaDialog/useMediaDialog";
import { mediaListSwapPlaces, openMediaDialog } from "actions/admin/projects";
import MediaDialogs from "./MediaDialogs";
import MediaContainer from "./MediaContainer";
import MediaItem from "./MediaItem";
import UploadMediaDropzone from "./UploadMediaDropzone";

const MediaOrderedInput = ({
  projectId,
  mediaList,
  mediaListSwapPlaces,
  openMediaDialog,
}) => {
  const theme = useTheme();

  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const imageUrls = mediaList.map((mediaObj, index) => {
    const {
      serverFilename,
      serverUrl,
      clientLocalUrl,
      mimeType,
      displayType,
      coverUrl,
    } = mediaObj;
    if (displayType === "image") {
      return serverUrl ? serverUrl : clientLocalUrl;
    }
    if (displayType === "video") {
      return coverUrl;
    }
    return null;
  });

  return (
    <>
      <MediaDialogs />
      <MediaContainer
        columns={isLg ? 4 : isMd ? 3 : isSm ? 2 : 1}
        spacing={theme.spacing(1)}
        swapItemPlaces={(sourceIndex, targetIndex) =>
          mediaListSwapPlaces({
            mediaList,
            sourceIndex,
            targetIndex,
          })
        }
      >
        {imageUrls.map((url, index) => (
          <MediaItem key={index}>
            <div
              src={url}
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                backgroundColor: "red",
              }}
            />
          </MediaItem>
        ))}
        <UploadMediaDropzone onDrop={(files) => openMediaDialog(files)} />
      </MediaContainer>
    </>
  );
};

const mapState = (state) => {
  const { mediaList } = state.project;
  return { mediaList };
};

export default connect(mapState, { mediaListSwapPlaces, openMediaDialog })(
  MediaOrderedInput
);
