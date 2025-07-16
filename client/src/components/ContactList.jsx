import { useEffect } from "react";
import { useNavigate } from "react-router";

import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import ContactCard from "./ContactCard";
import CustomSpeedDial from "./CustomSpeedDial";

import { useContacts } from "../hooks/useContacts";
import { useUser } from "../hooks/useUser";

export default function ContactList({ setScreenOpen, setCurrentContact }) {
  const { contacts } = useContacts();
  const { user } = useUser();

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isMobile) {
      setCurrentContact(null);
    }
  });

  /**
   * Handles a contact being selected by the user. If the user is on a mobile
   * device, the app navigates to the chat screen. If the user is on a larger
   * device, the message screen is opened.
   * @param {Object} contact - The contact object selected by the user
   */
  function handleContactClick(contact) {
    setCurrentContact(contact);
    isMobile ? navigate("/chat") : setScreenOpen(true);
  }
  return (
    <>
      <Container
        sx={{
          padding: "0px !important",
          borderRadius: "8px",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Contacts</Typography>
        <Box width="100%" overflow={"auto"} paddingBottom={5}>
          {contacts.map((contact) => (
            <ContactCard
              contact={contact}
              onClick={() => {
                handleContactClick(contact);
              }}
              key={contact.username}
            />
          ))}
        </Box>
        <Box sx={{ position: "fixed", bottom: 40, right: 10, zIndex: 100 }}>
          {isMobile && <CustomSpeedDial username={user.username} />}
        </Box>
      </Container>
    </>
  );
}
