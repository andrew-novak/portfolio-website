import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux";

import {
  mediaListRemove,
  mediaListSwapPlaces,
  openMediaEditDialog,
  closeMediaEditDialog,
  openMediaDialog,
} from "actions/admin/projects";
import getVideoCover from "helpers/getVideoCover";
import MediaDialogs from "./MediaDialogs";
import DialogMediaEdit from "components/dialogs/DialogMediaEdit";
import MediaContainer from "./MediaContainer";
import MediaItem from "./MediaItem";
import VideoCoverOverlay from "components/VideoCoverOverlay";
import UploadMediaDropzone from "./UploadMediaDropzone";

// Rectangular drag and drop grid media input component
// No beautifiers included here:
// No component title, outline or border radius
// Dialogs, drag n drop, and on-click preview included though
const MediaGridInput = ({
  // state
  mediaList: reduxMediaList,
  mediaEditDialog,
  // actions
  mediaListRemove,
  mediaListSwapPlaces,
  openMediaEditDialog,
  closeMediaEditDialog,
  openMediaDialog,
}) => {
  const theme = useTheme();

  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const mediaList = reduxMediaList || [];

  /*
  // Prepare images for each media
  const [imageUrls, setImageUrls] = useState(null);
  useEffect(() => {
    const setImages = async () => {
      const urls = await Promise.all(
        mediaList.map(async (mediaObj, index) => {
          const { serverUrl, clientLocalUrl, displayType, coverUrl } = mediaObj;
          if (displayType === "image" || displayType === "gif") {
            return serverUrl || clientLocalUrl;
          }
          if (displayType === "video") {
            // client-side video
            if (coverUrl) return coverUrl;
            // server-side video
            const blob = await getVideoCover(serverUrl);
            const url = URL.createObjectURL(blob);
            return url;
          }
          return null;
        })
      );
      setImageUrls(urls);
    };
    setImages();
  }, []);
  */

  const imageUrls = mediaList.map((mediaObj, index) => {
    const {
      //serverFilename, <- not used in this file
      serverUrl,
      clientLocalUrl,
      //mimeType,  <- not used in this file
      displayType,
      coverUrl,
    } = mediaObj;
    if (displayType === "image" || displayType === "gif") {
      return { imageUrl: serverUrl || clientLocalUrl, displayType };
    }
    if (displayType === "video") {
      return { imageUrl: coverUrl, displayType };
    }
    return null;
  });

  // for cancelation of mediaEditDialog opening
  const [isDialogOpeningCanceled, setIsDialogOpeningCanceled] = useState(false);
  const cancelDialogOpening = () => {
    setIsDialogOpeningCanceled(true);
  };

  if (!imageUrls) return null;

  return (
    <div>
      <MediaDialogs />
      <DialogMediaEdit
        dialogTitle="Showing Media"
        isOpen={mediaEditDialog.index != null && mediaEditDialog.url != null}
        displayType={mediaEditDialog.displayType}
        mediaUrl={mediaEditDialog.url}
        disableMoveLeft={mediaEditDialog.index < 1}
        disableMoveRight={mediaEditDialog.index > mediaList.length - 2}
        onCancel={closeMediaEditDialog}
        onMoveLeft={() => {
          mediaListSwapPlaces({
            mediaList,
            sourceIndex: mediaEditDialog.index,
            targetIndex: mediaEditDialog.index - 1,
          });
          closeMediaEditDialog();
        }}
        onMoveRight={() => {
          mediaListSwapPlaces({
            mediaList,
            sourceIndex: mediaEditDialog.index,
            targetIndex: mediaEditDialog.index + 1,
          });
          closeMediaEditDialog();
        }}
        onRemove={() =>
          mediaListRemove(
            mediaList,
            mediaEditDialog.index,
            closeMediaEditDialog
          )
        }
      />
      <MediaContainer
        columns={isLg ? 4 : isMd ? 3 : 2}
        spacing={theme.spacing(1)}
        swapItemPlaces={(sourceIndex, targetIndex) =>
          mediaListSwapPlaces({
            mediaList,
            sourceIndex,
            targetIndex,
          })
        }
      >
        {imageUrls.map((obj, index) => {
          const imageUrl = obj?.imageUrl || null;
          const displayType = obj?.displayType || null;
          return (
            // parent div just for cancelation of mediaEditDialog opening
            <div
              key={index}
              onMouseDown={() => setIsDialogOpeningCanceled(false)}
              onMouseUp={() => {
                !isDialogOpeningCanceled &&
                  openMediaEditDialog(mediaList, imageUrls, index);
                setIsDialogOpeningCanceled(false);
              }}
            >
              <MediaItem cancelDialogOpening={cancelDialogOpening}>
                <div
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
                {displayType === "video" && <VideoCoverOverlay />}
              </MediaItem>
            </div>
          );
        })}
        <UploadMediaDropzone onDrop={(files) => openMediaDialog(files)} />
      </MediaContainer>
    </div>
  );
};

const mapState = (state) => {
  const { mediaList, mediaEditDialog } = state.project;
  return { mediaList, mediaEditDialog };
};

export default connect(mapState, {
  mediaListRemove,
  mediaListSwapPlaces,
  openMediaEditDialog,
  closeMediaEditDialog,
  openMediaDialog,
})(MediaGridInput);
