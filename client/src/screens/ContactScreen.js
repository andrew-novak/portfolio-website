import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, TextField, Button } from "@mui/material";
import { connect } from "react-redux";

import sendEmail from "actions/sendEmail";
import Screen from "components/Screen";
import NavBar from "components/NavBar";
import Content from "components/Content";
import Footer from "components/Footer";

const ContactScreen = ({ sendEmail }) => {
  const theme = useTheme();
  const defaultEmailForm = {
    clientEmail: "",
    clientEmailRepeat: "",
    message: "",
  };
  const [emailForm, setEmailForm] = useState(defaultEmailForm);
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
            <TextField
              label="Email"
              onChange={(event) =>
                setEmailForm({ ...emailForm, clientEmail: event.target.value })
              }
            />
            <TextField
              label="Repeat Email"
              onChange={(event) =>
                setEmailForm({
                  ...emailForm,
                  clientEmailRepeat: event.target.value,
                })
              }
            />
            <TextField
              label="Message"
              onChange={(event) =>
                setEmailForm({ ...emailForm, message: event.target.value })
              }
            />
            <Button onClick={() => sendEmail(emailForm)}>Send</Button>
          </Container>
        </div>
      </Content>
      <Footer />
    </Screen>
  );
};

export default connect(null, { sendEmail })(ContactScreen);
