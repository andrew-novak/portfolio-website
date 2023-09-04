import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const NotFoundScreen = () => {
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
            <QuestionMarkIcon sx={{ fontSize: 80 }} />
            <Typography
              variant={theme.custom.muiProps.largeTitleVariant}
              sx={{ marginBottom: theme.spacing(2) }}
            >
              Page Not Found
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>Homepage</Button>
          </Container>
        </div>
      </Content>
      <Footer maxWidth="md" />
    </Screen>
  );
};

export default NotFoundScreen;
