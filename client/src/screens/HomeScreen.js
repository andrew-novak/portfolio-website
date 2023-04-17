import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Container, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";

import { getIntro } from "actions/intro";
import { getProjects } from "actions/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Intro from "components/Intro";
import GeometryPattern from "components/GeometryPattern";
import ProjectsGrid from "components/ProjectsGrid";
import Footer from "components/Footer";

const HomeScreen = ({
  isAdminLoggedIn,
  intro,
  projects,
  getIntro,
  getProjects,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(min-width:1600px)");
  //const isMobile = useMediaQuery(theme.breakpoints.up("xl"));

  useEffect(() => {
    getIntro();
    getProjects();
  }, [getIntro, getProjects]);

  return (
    <Screen>
      <NavBar />
      <Content>
        <div
          style={{
            //paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(3),
          }}
        >
          {/* Intro Section */}
          <Intro />
          {/* Projects Section */}
          <Container
            maxWidth="xl"
            disableGutters={isMobile}
            sx={{
              marginTop: theme.spacing(3),
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(3),
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                maxWidth: "calc(100vw - 20px)",
                width: "100%",
              }}
            >
              <Typography variant={theme.custom.muiProps.largeTitleVariant}>
                My Projects:
              </Typography>
              {isAdminLoggedIn && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/create-project")}
                >
                  Add Project
                </Button>
              )}
            </div>
          </Container>
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(3),
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}></div>
            <ProjectsGrid
              isAdmin={isAdminLoggedIn}
              projects={projects}
              cardHeightPercentRatio={theme.custom.heightPercentRatios["1:1"]}
            />
          </Container>
        </div>
      </Content>
      <Footer maxWidth="xl" />
    </Screen>
  );
};

const mapState = (state) => {
  const { isAdminLoggedIn } = state.adminAuth;
  const { intro } = state;
  const { projects } = state;
  return { isAdminLoggedIn, intro, projects };
};

export default connect(mapState, { getIntro, getProjects })(HomeScreen);
