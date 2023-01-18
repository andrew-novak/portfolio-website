import { useDispatch } from "react-redux";
import { useState } from "react";

import { setErrorSnackbar } from "actions/snackbar";
/*

  const onDropzoneDrop = (files) => {
    console.log(files);
    if (files.length > 1) {
      return setErrorSnackbar("Multiple files upload not supported");
    }
    const file = files[0];
    const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (acceptedImageTypes.include(file.type)) {
      return mediaDialog.open(file);
    }
    const acceptedVideoTypes = ["video/mp4"];
    if (acceptedVideoTypes.include(file.type)) {
      return mediaDialog.open(file);
    }
    setErrorSnackbar(`Unsupported file type: ${file.type}`);
  };
*/

const useMediaDialog = (files) => {
  const dispatch = useDispatch();
  const [openedMedia, setOpenedMedia] = useState({
    variant: null,
    file: null,
  });

  const open = (files) => {
    if (files.length < 1) {
      return dispatch(setErrorSnackbar("No file uploaded"));
    }
    if (files.length > 1) {
      return dispatch(setErrorSnackbar("Multiple files upload not supported"));
    }
    const file = files[0];
    const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (acceptedImageTypes.includes(file.type)) {
      return setOpenedMedia({ variant: "image", file });
    }
    const acceptedVideoTypes = ["video/mp4"];
    if (acceptedVideoTypes.includes(file.type)) {
      return setOpenedMedia({ variant: "video", file });
    }
    dispatch(setErrorSnackbar(`Unsupported file type: ${file.type}`));
  };

  const close = () => setOpenedMedia({ variant: null, file: null });

  return {
    variant: openedMedia.variant,
    file: openedMedia.file,
    open,
    close,
  };
};

export default useMediaDialog;
