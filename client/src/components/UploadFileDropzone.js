import { useTheme, Box, Typography } from "@mui/material";
import Dropzone from "react-dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const UploadFileDropzone = ({ filenames, style, onDrop }) => {
  const theme = useTheme();
  //const { style } = useContext(MediaItemContext);
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "rgb(230, 230, 230)",
              padding: theme.spacing(2),
              border: "1px solid",
              borderRadius: "4px",
              borderColor: theme.custom.colors.outline,
              "&:hover": {
                borderColor: theme.custom.colors.outlineHover,
              },
              ...style,
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Typography
              sx={{
                ...theme.custom.styles.inputLabel,
              }}
            >
              Drag 'n' drop or click to upload a file
            </Typography>
            {filenames && filenames.length > 0 && (
              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {filenames.map((filename, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    <InsertDriveFileIcon />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        display: "flex",
                        wordBreak: "break-all",
                      }}
                    >
                      {filename}
                    </Typography>
                  </div>
                ))}
              </Box>
            )}
          </Box>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadFileDropzone;
