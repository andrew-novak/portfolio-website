import { NODE_ENV, API_URL as API_URL_ENV, STATIC_URL } from "constants/env";

export const API_URL =
  NODE_ENV === "production" ? `${API_URL_ENV}` : "http://localhost:3001";

export const MEDIA_URL =
  NODE_ENV === "production" ? `${STATIC_URL}/media` : API_URL + "/media";

export const DOWNLOAD_URL =
  NODE_ENV === "production" ? `${STATIC_URL}/download` : API_URL + "/download";
