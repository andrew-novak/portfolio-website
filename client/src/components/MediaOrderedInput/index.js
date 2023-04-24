import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux";

//import useMediaDialog from "./MediaDialog/useMediaDialog";
import {
  mediaListRemove,
  mediaListSwapPlaces,
  openMediaEditDialog,
  closeMediaEditDialog,
  openMediaDialog,
} from "actions/admin/projects";
import MediaDialogs from "./MediaDialogs";
import DialogMediaEdit from "components/dialogs/DialogMediaEdit";
import MediaContainer from "./MediaContainer";
import MediaItem from "./MediaItem";
import UploadMediaDropzone from "./UploadMediaDropzone";

const MediaOrderedInput = ({
  projectId,
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
  const imageUrls = mediaList.map((mediaObj, index) => {
    const {
      //serverFilename, <- not used in this file
      serverUrl,
      clientLocalUrl,
      //mimeType,  <- not used in this file
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

  // for cancelation of mediaEditDialog opening
  const [isDialogOpeningCanceled, setIsDialogOpeningCanceled] = useState(false);
  const cancelDialogOpening = () => {
    setIsDialogOpeningCanceled(true);
  };

  return (
    <>
      <MediaDialogs />
      <DialogMediaEdit
        dialogTitle="Showing Media"
        isOpen={mediaEditDialog.index != null && mediaEditDialog.url != null}
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
        {imageUrls.map((url, index) => {
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
                  src={url}
                  style={{
                    backgroundImage: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </MediaItem>
            </div>
          );
        })}
        <UploadMediaDropzone onDrop={(files) => openMediaDialog(files)} />
      </MediaContainer>
    </>
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
})(MediaOrderedInput);
