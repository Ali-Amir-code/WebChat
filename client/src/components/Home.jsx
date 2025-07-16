import { useState } from "react";
import { Route, Routes } from "react-router";

import { useMediaQuery, useTheme, Box } from "@mui/material";

import ContactList from "./ContactList";
import MessageScreen from "./MessageScreen";
import WelcomeScreen from "./WelcomeScreen";

/**
 * The main home component that displays either a mobile or desktop version
 * of the application based on the screen size.
 *
 * The mobile version uses React Router to route between the contact list
 * and the message screen.
 *
 * The desktop version divides the screen into two columns: the left column
 * contains the contact list, and the right column contains either the message
 * screen or a welcome screen.
 *
 * @param {{ currentContact: Object, setCurrentContact: Function }} props
 * @returns {React.ReactElement}
 */
const Home = ({ currentContact, setCurrentContact }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [screenOpen, setScreenOpen] = useState(false);

  return isMobile ? (
    <Routes>
      <Route
        path=""
        element={<ContactList setCurrentContact={setCurrentContact} />}
      />
      <Route
        path="chat"
        element={
          <MessageScreen
            contact={currentContact}
            setContact={setCurrentContact}
            setScreenOpen={setScreenOpen}
          />
        }
      />
    </Routes>
  ) : (
    <>
      <Box width="30%" borderRight="1px solid #ccc">
        <ContactList
          setScreenOpen={setScreenOpen}
          setCurrentContact={setCurrentContact}
        />
      </Box>
      <Box flex={1}>
        {screenOpen && currentContact ? (
          <MessageScreen
            contact={currentContact}
            setContact={setCurrentContact}
            setScreenOpen={setScreenOpen}
          />
        ) : (
          <WelcomeScreen />
        )}
      </Box>
    </>
  );
};

export default Home;
