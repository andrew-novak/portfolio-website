import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  closeMediaDialog,
  mediaListAdd,
  mediaListAddVideo,
} from "actions/admin/projects";
import DialogImageCrop from "./DialogImageCrop";
import DialogVideoPreview from "./DialogVideoPreview";

// displays a specific dialog based on media type
const MediaDialogs = ({
  dialogVariant,
  file,
  closeMediaDialog,
  mediaListAdd,
  mediaListAddVideo,
}) => {
  const [mimeType, setMimeType] = useState();
  const [objectUrl, setObjectUrl] = useState();

  useEffect(() => {
    if (file !== null) {
      setMimeType(file.type);
      setObjectUrl(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <>
      <DialogImageCrop
        dialogTitle="Uploading an image"
        isOpen={dialogVariant === "image"}
        fileObjectUrl={
          dialogVariant === "image" && objectUrl ? objectUrl : null
        }
        onCancel={closeMediaDialog}
        onConfirm={(croppedImageUrl) =>
          mediaListAdd(croppedImageUrl, mimeType, closeMediaDialog)
        }
      />
      <DialogVideoPreview
        dialogTitle="Uploading a video"
        isOpen={dialogVariant === "video"}
        fileObjectUrl={
          dialogVariant === "video" && objectUrl ? objectUrl : null
        }
        onCancel={closeMediaDialog}
        onConfirm={(videoUrl, thumbnailUrl) =>
          mediaListAddVideo(file, videoUrl, mimeType, closeMediaDialog)
        }
      />
    </>
  );
};

const mapState = (state) => {
  const { dialogVariant, file } = state.projectSettings.mediaDialog;
  return { dialogVariant, file };
};

export default connect(mapState, {
  closeMediaDialog,
  mediaListAdd,
  mediaListAddVideo,
})(MediaDialogs);
