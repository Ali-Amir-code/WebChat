import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

import AddUserButton from "./AddUserButton";
import ComingSoonButton from "./ComingSoonButton";
import NotificationPopover from "./NotificationPopover";

/**
 * A footer component that is fixed at the bottom of the page.
 * 
 * Utilizes Material-UI's Box component for layout and styling, 
 * adapting its padding based on the device's screen size.
 * 
 * The footer contains:
 * - Developer attribution with a link to Ali Amir's GitHub.
 * - A set of buttons (Add User, Create Group, Join Group) 
 *   displayed on larger screens.
 * - A NotificationPopover component.
 * 
 * @returns {JSX.Element} The Footer component.
 */

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 0,
        px: 0,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        textAlign: "center",
        borderTop: `1px solid ${theme.palette.divider}`,
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Box
        maxWidth="false"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={isMobile ? 0 : 2}
      >
        <Typography variant="body1">
          Developed by{" "}
          <a
            href="https://github.com/ali-amir-code"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            Ali Amir
          </a>
        </Typography>
        <Box display={"flex"}>
          {!isMobile && (
            <Box display={"flex"} gap={1}>
              <AddUserButton />
              <ComingSoonButton text="Create Group" />
              <ComingSoonButton text="Join Group" />
            </Box>
          )}

          <NotificationPopover />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
