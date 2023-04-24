export { default as getProject } from "./getProject";
// dialogs
export {
  openColorDialog,
  closeColorDialog,
  setDialogColor,
} from "./colorDialog";
export { openMediaDialog, closeMediaDialog } from "./mediaDialog";
export { openMediaEditDialog, closeMediaEditDialog } from "./dialogEditMedia";
// form
export { default as changePosition } from "./changePosition";
export {
  setColor,
  setTitle,
  setDescription,
  selectDescription,
  clearDescriptionList,
} from "./simpleInputs";
export {
  mediaListAddImage,
  mediaListAddVideo,
  mediaListSwapPlaces,
  mediaListRemove,
} from "./mediaList";
export { default as createProject } from "./createProject";
export { default as editProject } from "./editProject";
export { default as removeProject } from "./removeProject";
