import { Box, IconButton, TextField } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

/**
 * A component that renders a form for sending a message.
 * The form contains a TextField and an IconButton with a SendIcon.
 * The TextField is used to input a message and the IconButton is used to
 * submit the message.
 * The component takes in the sendMessage function and the text and setText
 * states as props.
 *
 * @param {{sendMessage: function, text: string, setText: function}} props
 * @returns {JSX.Element}
 */
export default function MessageInput({sendMessage, text, setText}) {
  const handleChange = (e) => {
    setText(e.currentTarget.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = document.getElementById('messageText').value;
    document.getElementById('messageText').value = '';
    sendMessage(messageText);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          p: 2,
          borderTop: "1px solid #ccc",
        }}
      >
        <TextField
          fullWidth
          id="messageText"
          variant="outlined"
          placeholder="Type a message"
          size="small"
          onChange={handleChange}
        />
        <IconButton sx={{ ml: 1 }} disabled={!text} type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </form>
  );
}
