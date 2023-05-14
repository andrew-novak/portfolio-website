export const API_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_API_URL}`
    : "http://localhost:3001";

export const MEDIA_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_STATIC_URL}/media`
    : API_URL + "/media";

export const DOWNLOAD_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_STATIC_URL}/download`
    : API_URL + "/download";
