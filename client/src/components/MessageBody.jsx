import { Box, Typography } from "@mui/material";

/**
 * A component that displays a contact's messages in a scrolling box.
 * The box is divided into a column of boxes, each containing a message.
 * The background color of each box is green if the message was sent by
 * the user, and gray if it was sent by the contact. The message text is
 * displayed in black. The boxes are divided by a gap of 1rem.
 *
 * @param {Object} contact - An object with a messages property, which is
 * an array of objects each with content and type properties.
 * @returns {ReactElement} A ReactElement containing the component.
 */
export default function MessageBody({ contact }) {
  let id = 0;
  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {contact.messages.map((msg) => (
        <Box
          key={id++}
          sx={{
            alignSelf: msg.type === "sent" ? "flex-end" : "flex-start",
            backgroundColor: msg.type === "sent" ? "#dcf8c6" : "#e8e8e8",
            color: "#000",
            p: 1.5,
            borderRadius: 2,
            maxWidth: "75%",
          }}
        >
          <Typography variant="body2" color="inherit">
            {msg.content}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
