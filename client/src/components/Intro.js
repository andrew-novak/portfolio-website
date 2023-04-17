import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  useMediaQuery,
  Container,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { connect } from "react-redux";

import useWindowDimensions from "hooks/useWindowDimensions";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import GeometryPattern from "components/GeometryPattern";
import Footer from "components/Footer";

const Intro = ({ hideEditButton, isAdminLoggedIn, colors, image, text }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallerThan1600 = useMediaQuery("(min-width:1600px)");
  const { width: windowWidth } = useWindowDimensions();
  const imageSize = 200;
  const separatingMargin = 24;
  const isMobile = windowWidth < 700;
  const isLargeScreen = windowWidth > 1000;
  const geometryColor = "#3c3b3b";
  const desktopTextColor = "#525252";
  const mobileTextColor = "#464444";
  return (
    <div style={{ position: "relative" }}>
      {/* Edit Button Section (Admin-Accessible) */}
      <div style={{ position: "absolute", width: "100%", zIndex: 5 }}>
        <Container maxWidth="xl" disableGutters={isSmallerThan1600} sx={{}}>
          <div
            style={{
              marginTop: theme.spacing(1),
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {isAdminLoggedIn && (
              <Button
                disabled={hideEditButton}
                startIcon={<EditIcon />}
                sx={{ display: hideEditButton && "none" }}
                onClick={() => navigate("/edit-intro")}
              >
                Edit Intro
              </Button>
            )}
          </div>
        </Container>
      </div>
      {/* Secton Visible to Clients */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: colors[0],
          position: "relative",
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters
          sx={{
            display: "flex",
            position: "relative",
          }}
        >
          <div style={{ position: "relative", overflow: "hidden" }}>
            <GeometryPattern
              color1={geometryColor}
              color2={colors[0] || "#ffffff"}
            />
            <div style={{ position: "absolute" }}>
              <GeometryPattern
                color1={geometryColor}
                color2={colors[0] || "#ffffff"}
              />
              <GeometryPattern
                color1={geometryColor}
                color2={colors[0] || "#ffffff"}
              />
              <GeometryPattern
                color1={geometryColor}
                color2={colors[0] || "#ffffff"}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "35px -80px",
              width: "calc(100% - 70px)",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                height: imageSize,
                width: imageSize,
                marginRight: separatingMargin,
              }}
            >
              <Box
                sx={{
                  height: imageSize,
                  width: imageSize,
                  borderRadius: "100%",
                  backgroundColor: "white",
                  backgroundImage:
                    (image.serverUrl && `url(${image.serverUrl})`) ||
                    (image.clientLocalUrl && `url(${image.clientLocalUrl})`),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: 3,
                  // just for zIndex:
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
            {!isMobile && (
              <div style={{ width: "100%" }}>
                <div style={{ width: "100%", maxWidth: 800 }}>
                  <Typography
                    variant="p"
                    maxWidth={700}
                    sx={{
                      flex: 1,
                      fontSize: isLargeScreen ? 40 : 30,
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                      color: desktopTextColor,
                    }}
                    style={{ maxWidth: 600 }}
                  >
                    {text}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
      {isMobile && text && (
        <div
          style={{
            width: "100%",
            background: colors[1],
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
          }}
        >
          <Container maxWidth="xl">
            <Typography
              align="center"
              sx={{ fontSize: 25, color: mobileTextColor }}
            >
              {text}
            </Typography>
          </Container>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  const { isAdminLoggedIn } = state.adminAuth;
  const { colors, image, text } = state.intro;
  return { isAdminLoggedIn, colors, image, text };
};

export default connect(mapState)(Intro);
