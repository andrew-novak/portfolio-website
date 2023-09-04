import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';

import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const NoConnectionScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
          <Container maxWidth="md" align="center">
            <WarningIcon sx={{ fontSize: 80 }} />
            <Typography
              variant={theme.custom.muiProps.largeTitleVariant}
              sx={{ marginBottom: theme.spacing(2) }}
            >
              No Connection
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>Homepage</Button>
          </Container>
        </div>
      </Content>
      <Footer maxWidth="md" />
    </Screen>
  );
};

export default NoConnectionScreen;
