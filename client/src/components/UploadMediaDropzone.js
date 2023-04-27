import { useTheme } from "@mui/material/styles";
import Dropzone from "react-dropzone";

const UploadMediaDropzone = ({ style, onDrop }) => {
  const theme = useTheme();
  //const { style } = useContext(MediaItemContext);
  return (
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
              backgroundColor: "rgb(230, 230, 230)",
              padding: theme.spacing(1),
              ...style,
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop or click to add media</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadMediaDropzone;
