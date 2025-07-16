import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Box, useTheme, useMediaQuery } from "@mui/material";

import MessageScreenHeader from "./MessageScreenHeader";
import MessageBody from "./MessageBody";
import MessageInput from "./MessageInput";

import { useUser } from "../hooks/useUser";
import { useContacts } from "../hooks/useContacts";

import { socket } from "../lib/socket";

/**
 * Component for displaying a chat interface with a selected contact.
 *
 * This component renders the message screen where users can view messages
 * and send new ones to the selected contact. It handles navigating away
 * when no contact is selected and manages the state of the text input.
 *
 * Props:
 * - contact: The currently selected contact object containing user details
 *   and messages.
 * - setScreenOpen: Function to set the visibility of the message screen.
 * - setContact: Function to update the current contact.
 *
 * State:
 * - text: The current text value in the message input field.
 *
 * Hooks:
 * - useUser: Provides the current user context.
 * - useContacts: Provides the context for managing contacts.
 * - useTheme and useMediaQuery: Used to determine the current theme and
 *   screen size.
 * - useNavigate: Used for programmatic navigation.
 *
 * Effects:
 * - Redirects to the home page if no contact is selected.
 *
 * Functions:
 * - handleCloseScreen: Clears the text input and navigates away or closes
 *   the screen based on the device type.
 * - sendMessage: Sends a message to the selected contact, updates the
 *   contact's messages, and emits a socket event.
 *
 * Renders:
 * - MessageScreenHeader: Displays the contact's name and a close button.
 * - MessageBody: Displays the conversation with the contact.
 * - MessageInput: Input field for sending new messages.
 */

export default function MessageScreen({ contact, setScreenOpen, setContact }) {
  const [text, setText] = useState("");
  const { user } = useUser();
  const { setContacts } = useContacts();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!contact) {
      navigate("/");
    }
  }, [contact, navigate]);

  if (!contact) return null;

  function handleCloseScreen() {
    setText("");
    isMobile ? navigate("/") : setScreenOpen(false);
  }

  const sendMessage = (messageText) => {
    setText("");
    const message = {
      content: messageText,
      type: "sent",
      time: new Date().toTimeString().slice(0, 5),
    };

    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.username === contact.username
          ? { ...c, messages: [...c.messages, message] }
          : c
      )
    );

    setContact((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    socket.emit("message", {
      from: user.username,
      for: contact.username,
      message: messageText,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        border: "1px solid #ccc",
        paddingBottom: 5,
      }}
    >
      <MessageScreenHeader
        name={contact.username}
        type={contact.type}
        handleCloseScreen={handleCloseScreen}
      />
      <MessageBody contact={contact} />
      <MessageInput sendMessage={sendMessage} text={text} setText={setText} />
    </Box>
  );
}