import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GitHubIcon from "@mui/icons-material/GitHub";
import DownloadIcon from "@mui/icons-material/Download";

export const PROJECT_MEDIA_FILE_FORMATS = [
  { mimeType: "image/jpeg", extension: "jpeg", displayType: "image" },
  { mimeType: "image/jpg", extension: "jpg", displayType: "image" },
  { mimeType: "image/png", extension: "png", displayType: "image" },
  { mimeType: "image/gif", extension: "gif", displayType: "gif" },
  { mimeType: "video/mp4", extension: "mp4", displayType: "video" },
  { mimeType: "video/webm", extension: "webm", displayType: "video" },
];

export const PROJECT_BUTTON_ICONS = [
  { MuiIcon: null, value: null },
  { MuiIcon: PlayArrowIcon, value: "PlayArrow" },
  { MuiIcon: GitHubIcon, value: "GitHub" },
  { MuiIcon: DownloadIcon, value: "Download" },
];
