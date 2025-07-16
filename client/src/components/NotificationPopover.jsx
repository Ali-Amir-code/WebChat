import { useState } from "react";
import { Popover, IconButton, Box, Typography, Divider, Badge } from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import Notification from "./Notification";

import {useNotifications} from '../hooks/useNotifications'

/**
 * A component that renders a notification popover with a list of notifications.
 * 
 * Utilizes Material-UI components such as Popover, IconButton, Badge, and Box
 * to display notifications in a popover that appears when the notification
 * icon button is clicked.
 * 
 * The number of notifications is displayed as a badge on the notification icon.
 * The popover is anchored to the icon button and displays a list of notifications
 * using the Notification component. The popover can be closed by clicking outside
 * or clicking the close icon on the popover.
 * 
 * @returns {JSX.Element} The NotificationPopover component.
 */

export default function NotificationPopover() {

  const [anchorEl, setAnchorEl] = useState(null);

  const {notifications} = useNotifications();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "custom-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon color="primary"/>
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: "-8px",
              px: 1,
              py: 1,
              border: "1px solid #ccc",
              boxShadow: 3,
              borderRadius: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                width: 0,
                height: 0,
                bottom: -10,
                left: "calc(50% - 8px)",
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "10px solid white",
                zIndex: 1,
              },
            },
          },
        }}
      >
        <Box sx={{ minWidth: 200, height: 300 }} display={"flex"} flexDirection={"column"} textAlign={"center"} alignItems={"center"}>
          <Typography variant="h5">Notifications</Typography>
          <Divider sx={{ width: "100%" , color: "#ccc"}}/>
          {notifications.map((notification) => (
            <Notification key={`${notification.type + notification.from}`} notification={notification} />
          ))}
        </Box>
      </Popover>
    </>
  );
}
