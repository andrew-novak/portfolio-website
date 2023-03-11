import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { connect } from "react-redux";

import { getProjects } from "actions/projects";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";
import ProjectsGrid from "components/ProjectsGrid";

const HomeScreen = ({ projects, getProjects }) => {
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
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(3),
          }}
        >
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
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
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/create-project")}
                >
                  Add Project
                </Button>
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
  const { projects } = state;
  return { projects };
};

export default connect(mapState, { getProjects })(HomeScreen);
