import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";

import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const ContactScreen = () => {
  const theme = useTheme();
  return (
    <Screen>
      <NavBar />
      <Content>
        <div
          style={{
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(3),
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: theme.spacing(3),
            }}
          >
            <Typography variant="h3">Contact</Typography>
          </Container>
        </div>
      </Content>
      <Footer />
    </Screen>
  );
};

export default ContactScreen;
