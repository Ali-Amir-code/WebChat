import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router";

import { useMediaQuery, useTheme, Box } from "@mui/material";

import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";

import { socket } from "./lib/socket";

import { useUser } from "./hooks/useUser";
import { useNotifications } from "./hooks/useNotifications";
import { usePendingRequests } from "./hooks/usePending";
import { useContacts } from "./hooks/useContacts";

/**
 * The main application component that manages user and contact states,
 * handles socket events for communication, and renders the appropriate
 * components based on user authentication status.
 *
 * Utilizes context hooks to manage user, notifications, pending requests,
 * and contacts. It employs socket listeners to handle various events such
 * as receiving messages, connection requests, and disconnections.
 * 
 * The component conditionally renders the Home or Login component based
 * on the user's authentication status, and always renders the Footer.
 */

function App() {
  const { user, setUser } = useUser();
  const { setNotifications } = useNotifications();
  const { pendingRequests, setPendingRequests } = usePendingRequests();
  const { setContacts } = useContacts();

  const [currentContact, setCurrentContact] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleId = (id) => {
      setUser((prev) => ({ ...prev, id: id }));
    };
    const handleRequest = (from) => {
      if (pendingRequests.find((contact) => contact.username === from)) return;
      setPendingRequests((prev) => [
        ...prev,
        { username: from, type: "recieved" },
      ]);
      setNotifications((prev) => [...prev, { type: "request", from: from }]);
    };
    const handleResponse = ({ from, status }) => {
      if (status === "accepted") {
        setContacts((prev) => [
          ...prev,
          {
            type: "single",
            username: from,
            hasUnreadMessages: false,
            messages: [],
          },
        ]);

        setPendingRequests((prev) =>
          prev.filter((r) => r.username !== from && r.type !== "sent")
        );
      }
      setNotifications((prev) => [
        ...prev,
        { type: "response", from: from, status: status },
      ]);
    };

    const handleMessage = ({ from, messageText }) => {
      console.log('Message Recieved: ', messageText, from)
      let message = {
        content: messageText,
        type: "revieved",
        time: new Date().toTimeString().slice(0, 5),
      };
      setContacts((prevContacts) =>
        prevContacts.map((c) =>
          c.username === from
            ? {
                ...c,
                messages: [...c.messages, message],
                hasUnreadMessages: true,
              }
            : c
        )
      );
      if (currentContact?.username === from) {
        setCurrentContact((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
          hasUnreadMessages: false
        }));
      }
    };

    const handleDisconnect = (disconnectedUser) => {
      if (!currentContact || currentContact?.username === disconnectedUser) {
        setCurrentContact(null);
      }
      setContacts((prev) =>
        prev.filter((c) => c.username !== disconnectedUser)
      );
      setNotifications((prev) =>
        prev.filter((n) => n.from !== disconnectedUser)
      );
      setNotifications((prev) => [
        ...prev,
        { type: "disconnect", from: disconnectedUser },
      ]);
    };

    socket.on("id", handleId);
    socket.on("request", handleRequest);
    socket.on("response", handleResponse);
    socket.on("message", handleMessage);
    socket.on("leave", handleDisconnect);

    return () => {
      socket.off("id", handleId);
      socket.off("request", handleRequest);
      socket.off("response", handleResponse);
      socket.off("message", handleMessage);
      socket.off("leave", handleDisconnect);
    };
  }, [currentContact, pendingRequests, setContacts, setNotifications, setPendingRequests,setUser]);

  return (
    <>
      <BrowserRouter>
        <Box display="flex" width="100%" height={isMobile ? "90vh" : "93vh"}>
          {user.username ? (
            <Home
              currentContact={currentContact}
              setCurrentContact={setCurrentContact}
            />
          ) : (
            <Login />
          )}
        </Box>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
