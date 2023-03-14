import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";

import { getProjects } from "actions/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Intro from "components/Intro";
import GeometryPattern from "components/GeometryPattern";
import ProjectsGrid from "components/ProjectsGrid";
import Footer from "components/Footer";

const HomeScreen = ({ isAdminLoggedIn, projects, getProjects }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

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
            disableGutters
            sx={{
              marginTop: theme.spacing(3),
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(3),
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  maxWidth: "calc(100vw - 20px)",
                  width: "100%",
                }}
              >
                <Typography variant="h4">My Projects:</Typography>
                {isAdminLoggedIn && (
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/create-project")}
                  >
                    Add Project
                  </Button>
                )}
              </div>
            </div>
            <ProjectsGrid
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
  const { projects } = state;
  return { isAdminLoggedIn, projects };
};

export default connect(mapState, { getProjects })(HomeScreen);
