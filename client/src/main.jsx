import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Box from "@mui/material/Box";
import App from "./App.jsx";
import "./index.css";

import { UserProvider } from "./context/UserContext.jsx";
import { ContactsProvider } from "./context/ContactsContext.jsx";
import { NotificationsProvider } from "./context/NotificationsContext.jsx";
import { PendingProvider } from "./context/PendingContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ContactsProvider>
        <NotificationsProvider>
          <PendingProvider>
            <App />
          </PendingProvider>
        </NotificationsProvider>
      </ContactsProvider>
    </UserProvider>
  </StrictMode>
);
