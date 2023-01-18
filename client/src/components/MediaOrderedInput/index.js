import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux";

//import useMediaDialog from "./MediaDialog/useMediaDialog";
import {
  mediaListSwapPlaces,
  openMediaDialog,
} from "actions/admin/projectCreateEdit";
import MediaDialogs from "./MediaDialogs";
import MediaContainer from "./MediaContainer";
import getMedia from "helpers/getMedia";
import { shouldDisplayImage, shouldDisplayVideo } from "helpers/fileTypes";
import MediaItem from "./MediaItem";
import UploadMediaDropzone from "./UploadMediaDropzone";

const MediaOrderedInput = ({
  projectId,
  mediaList,
  mediaListSwapPlaces,
  openMediaDialog,
}) => {
  const theme = useTheme();

  //const mediaDialog = useMediaDialog();

  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <MediaDialogs /*mediaDialog={mediaDialog}*/ />
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
        {mediaList.map(
          (
            { clientLocalUrl, clientMimeType, serverFilename, coverUrl },
            index
          ) => {
            const serverUrl = serverFilename
              ? getMedia.oneProjectFileUrl(projectId, serverFilename)
              : null;
            const serverExtension = serverFilename
              ? serverFilename.split(".").pop()
              : null;

            const url = serverUrl ? serverUrl : clientLocalUrl;

            const Image = ({ url }) => (
              <div
                src={url}
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
            );

            return (
              <MediaItem key={index}>
                {shouldDisplayImage(serverExtension, clientMimeType) && (
                  <Image url={url} />
                )}
                {shouldDisplayVideo(serverExtension, clientMimeType) && (
                  <Image url={coverUrl} />
                )}
              </MediaItem>
            );
          }
        )}
        {/*<UploadMediaDropzone onDrop={(files) => mediaDialog.open(files)} />*/}
        <UploadMediaDropzone onDrop={(files) => openMediaDialog(files)} />
      </MediaContainer>
    </>
  );
};

const mapState = (state) => {
  const { mediaList } = state.projectCreateEdit;
  return { mediaList };
};

export default connect(mapState, { mediaListSwapPlaces, openMediaDialog })(
  MediaOrderedInput
);
