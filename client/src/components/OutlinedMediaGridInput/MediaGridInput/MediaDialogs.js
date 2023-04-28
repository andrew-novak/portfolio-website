import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  closeMediaDialog,
  mediaListAddImage,
  mediaListAddVideo,
} from "actions/admin/projects";
import { PROJECT_MEDIA_FILE_FORMATS } from "constants/projects";
import DialogImageCrop from "components/dialogs/DialogImageCrop";
import DialogVideoPreview from "components/dialogs/DialogVideoPreview";

// displays a specific dialog based on media type
const MediaDialogs = ({
  dialogVariant,
  file,
  closeMediaDialog,
  mediaListAddImage,
  mediaListAddVideo,
}) => {
  const [mimeType, setMimeType] = useState(null);
  const [displayType, setDisplayType] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (file !== null) {
      setMimeType(file.type);
      const newDisplayType = PROJECT_MEDIA_FILE_FORMATS.find(
        (obj) => obj.mimeType === file.type
      ).displayType;
      setDisplayType(newDisplayType);
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
          mediaListAddImage({
            localUrl: croppedImageUrl,
            mimeType,
            displayType,
            closeMediaDialog,
          })
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
          mediaListAddVideo({
            videoFile: file,
            videoUrl,
            mimeType,
            displayType,
            closeMediaDialog,
          })
        }
      />
    </>
  );
};

const mapState = (state) => {
  const { dialogVariant, file } = state.project.mediaDialog;
  return { dialogVariant, file };
};

export default connect(mapState, {
  closeMediaDialog,
  mediaListAddImage,
  mediaListAddVideo,
})(MediaDialogs);
