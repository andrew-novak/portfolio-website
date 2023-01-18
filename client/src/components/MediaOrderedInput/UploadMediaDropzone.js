import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Dropzone from "react-dropzone";

import { MediaItemContext } from "./MediaItem";

const UploadMediaDropzone = ({ onDrop }) => {
  const theme = useTheme();
  const { style } = useContext(MediaItemContext);
  return (
    <div style={style}>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: theme.custom.colors.activityInactive,
                padding: theme.spacing(1),
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop or click to add media</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadMediaDropzone;
