import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTheme,
  Box,
  Typography,
  TextField,
  Link,
  Button,
} from "@mui/material";
import { connect } from "react-redux";

import { login } from "actions/admin/auth";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const AdminLoginScreen = ({ login }) => {
  const theme = useTheme();
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
            background: "rgb(230, 230, 230)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              width: 400,
              marginTop: "10vh",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(3),
              padding: theme.spacing(4),
              boxShadow: 2,
            }}
          >
            <Typography
              variant={theme.custom.muiProps.largeTitleVariant}
              align="center"
            >
              Admin Login
            </Typography>
            <TextField
              label="Email"
              value={email}
              fullWidth
              inputProps={{
                autoComplete: 'off',
              }}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              value={password}
              type="password"
              fullWidth
              inputProps={{
                autoComplete: 'off',
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
            {/*<Link sx={{ color: "rgb(250, 44, 143)" }}>Forgot password</Link>*/}
            <Button
              fullWidth
              onClick={() =>
                login({ email, password, onSuccessRedirect: () => navigate("/") })
              }
            >
              Login
            </Button>
          </Box>
        </div>
      </Content>
      <Footer />
    </Screen>
  );
};

export default connect(null, { login })(AdminLoginScreen);
