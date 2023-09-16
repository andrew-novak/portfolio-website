// form
export { default as changePosition } from "./form/changePosition";
export {
  openColorDialog,
  closeColorDialog,
  setDialogColor,
  setColor,
} from "./form/color";
export {
  setTitle,
  setCategoryTags,
  setFeatureTags,
  setDescription,
  selectDescription,
  clearDescriptionList,
} from "./form/text";
export { openMediaDialog, closeMediaDialog } from "./form/mediaDialog";
export {
  openMediaEditDialog,
  closeMediaEditDialog,
} from "./form/dialogEditMedia";
export {
  mediaListAddImage,
  mediaListAddVideo,
  mediaListSwapPlaces,
  mediaListRemove,
} from "./form/mediaList";
export {
  openButtonDialog,
  closeButtonDialog,
  setDialogButton, // sets project.buttonDialog.button
  setButton,
} from "./form/buttons";

// requests
export { default as getProject } from "./requests/getProject";
export { default as createProject } from "./requests/createProject";
export { default as editProject } from "./requests/editProject";
export { default as removeProject } from "./requests/removeProject";
