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
  const [clientEmail, setClientEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const maxMessageChars = 1000;
  const isMessageTooLong = message.length > maxMessageChars;
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
            <Typography variant={theme.custom.muiProps.largeTitleVariant}>
              Send a message
            </Typography>
            <TextField
              label="Your Email"
              fullWidth
              onChange={(event) => setClientEmail(event.target.value)}
            />
            <TextField
              label="Message"
              error={isMessageTooLong}
              multiline
              minRows={3}
              fullWidth
              onChange={(event) => setMessage(event.target.value)}
            />
            <Typography
              sx={{
                marginTop: -2,
                fontSize: 14,
                color: isMessageTooLong ? "#d32f2f" : null,
              }}
            >
              Character count: {message.length} / {maxMessageChars}
            </Typography>
            <Button
              onClick={() =>
                sendEmail({
                  clientEmail,
                  message,
                  onSuccessRedirect: () => navigate("/"),
                })
              }
            >
              Send
            </Button>
          </Container>
        </div>
      </Content>
      <Footer maxWidth="md" />
    </Screen>
  );
};

export default connect(null, { sendEmail })(ContactScreen);
