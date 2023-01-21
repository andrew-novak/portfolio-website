import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Link, Button } from "@mui/material";
import { connect } from "react-redux";

import { login } from "actions/admin/auth";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const AdminLoginScreen = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <Screen>
      <NavBar />
      <Content>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: 400,
              marginTop: "10vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" align="center">
              Admin
            </Typography>
            <TextField
              label="Email"
              value={email}
              fullWidth
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              value={password}
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
            />
            <Link sx={{ color: "rgb(250, 44, 143)" }}>Forgot password</Link>
            <Button
              fullWidth
              onClick={() =>
                login({ email, password, redirect: () => navigate("/") })
              }
            >
              Login
            </Button>
          </div>
        </div>
      </Content>
      <Footer />
    </Screen>
  );
};

export default connect(null, { login })(AdminLoginScreen);
