import { Box, Button, Tooltip, Typography, Badge } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";


/**
 * A component that displays a contact card with user information.
 * 
 * Props:
 * - contact: An object containing contact details such as username, type,
 *   and messages.
 * - onClick: A function to handle click events on the card.
 * 
 * The card displays the contact's username, type (single or group), 
 * and the time and content of the last message. The card is styled 
 * using Material-UI components and provides a tooltip for the last 
 * message content.
 */

export default function ContactCard({ contact, onClick }) {
  return (
    <>
      <Button
        color="initial"
        fullWidth
        sx={{
          border: "1px solid #ccc",
        }}
        onClick={onClick}
        id={contact.username}
      >
        <Box display={"flex"} flexDirection={"row"} width={"100%"} gap={1}>
          <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} flexDirection={"row"}>
                {contact.type === "single" ? <PersonIcon /> : <GroupIcon />}
                <Typography variant="h6">{contact.username}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  {(contact.messages &&
                    contact.messages[contact.messages.length - 1]?.time) ||
                    "Now"}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Tooltip
                title={
                  (contact.messages &&
                    contact.messages[contact.messages.length - 1]?.content) ||
                  "Here you will see the content of last message"
                }
                placement="top"
              >
                <Typography
                  noWrap
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 200,
                  }}
                >
                  {(contact.messages &&
                    contact.messages[contact.messages.length - 1]?.content) ||
                    "Here you will see the content of last message"}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Button>
    </>
  );
}
