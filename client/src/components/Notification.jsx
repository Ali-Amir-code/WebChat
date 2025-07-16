import { Box, Button, Typography } from "@mui/material";

import { useUser } from "../hooks/useUser";
import { useContacts } from "../hooks/useContacts";
import { useNotifications } from "../hooks/useNotifications";
import { usePendingRequests } from "../hooks/usePending";

/**
 * A Notification component that displays a notification
 * with appropriate actions such as accept, decline, or ok.
 *
 * Props:
 * - notification: An object containing the notification details such as
 *   type (request, response, disconnect), from (username of the user who
 *   sent the notification), and status (accepted or declined).
 *
 * The component displays the notification type, from, and status, and
 * provides a button for the user to accept, decline, or ok the notification.
 *
 * @return {React.ReactElement} A JSX element representing the notification.
 */
export default function Notification({ notification }) {
  const { user } = useUser();
  const { setContacts } = useContacts();
  const { setNotifications } = useNotifications();
  const { setPendingRequests } = usePendingRequests();
  let component;
  const handleAccept = async () => {
    handleResponse("accepted");
  };
  const handleDecline = async () => {
    handleResponse("declined");
  };
  const handleResponse = async (status) => {
    try {
      const res = await fetch("/api/addUserResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          for: notification.from,
          from: user.username,
          status: status,
        }),
      });
      const data = await res.json();

      setPendingRequests((prev) =>
        prev.filter(
          (r) => r.username !== notification.from && r.type !== "recieved"
        )
      );
      setNotifications((prev) =>
        prev.filter((n) => n.type !== "request" && n.from !== notification.from)
      );
      if (data.success) {
        setContacts((prev) => [
          ...prev,
          {
            type: "single",
            username: notification.from,
            messages: [],
            hasUnreadMessages: false
          },
        ]);
      } else {
        alert(data.message)
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (notification.type === "request") {
    component = (
      <>
        <Typography variant="h5">Friend Request</Typography>
        <Typography variant="body1">{`${notification.from} wants to be your friend`}</Typography>
        <Box display={"flex"} flexDirection={"row-reverse"} gap={1}>
          <Button onClick={handleAccept}>Accept</Button>
          <Button onClick={handleDecline}>Decline</Button>
        </Box>
      </>
    );
  } else if (notification.type === "response") {
    component = (
      <>
        <Typography variant="h5">Friend Response</Typography>
        <Typography variant="body1">
          {notification.status === "accepted"
            ? `${notification.from} accepted your friend request`
            : `${notification.from} declined  your friend request`}
        </Typography>
        <Box display={"flex"} flexDirection={"row-reverse"} gap={1}>
          <Button
            onClick={() => {
              setNotifications((prev) =>
                prev.filter(
                  (n) => n.type !== "response" && n.from !== notification.from
                )
              );
            }}
          >
            Ok
          </Button>
        </Box>
      </>
    );
  } else if (notification.type === "disconnect") {
    component = (
      <>
        <Typography variant="h5">User Disconnected</Typography>
        <Typography variant="body1">{`${notification.from} disconnected from WebChat`}</Typography>
        <Box display={"flex"} flexDirection={"row-reverse"} gap={1}>
          <Button
            onClick={() => {
              setNotifications((prev) =>
                prev.filter(
                  (n) => n.type !== "disconnect" && n.from !== notification.from
                )
              );
            }}
          >
            ok
          </Button>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box border={1} p={1} borderRadius={1}>
        {component}
      </Box>
    </>
  );
}
