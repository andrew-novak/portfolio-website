import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";

import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const NotFoundScreen = () => {
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
          <Container maxWidth="md">
            <Typography
              variant={theme.custom.muiProps.largeTitleVariant}
              sx={{ marginBottom: theme.spacing(2) }}
            >
              Page Not Found
            </Typography>
          </Container>
        </div>
      </Content>
      <Footer maxWidth="md" />
    </Screen>
  );
};

export default NotFoundScreen;
