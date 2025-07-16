import { useState } from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

/**
 * A component that renders a button which opens a dialog with a form in it.
 * The form contains a text input and a submit button. The component also
 * handles the form submission and the input's change event.
 * @param {{isDisabled: boolean, title: string, content: string, buttonText: string, inputLabel: string}} props
 * @returns {JSX.Element}
 */
export default function CustomModal({
  isDisabled,
  title,
  content,
  buttonText,
  inputLabel,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleClose();
  };
/**
 * Handles the change event of the input field in the dialog.
 * Disables the submit button if the input is empty, contains spaces, or is shorter than 3 characters.
 * Enables the submit button otherwise.
 * @param {Event} event - The input change event.
 */
  const handleChange = (event) => {
    const infoText = document.getElementById("infoText");
    const submitButton = document.getElementById("submit");
    if (event.target.value === "") {
      submitButton.disabled = true;
      return (infoText.innerHTML = "");
    }
    if (event.target.value.includes(" ")) {
      submitButton.disabled = true;
      return (infoText.innerHTML = "Name cannot contain spaces.");
    }
    if (event.target.value.length < 3) {
      submitButton.disabled = true;
      return (infoText.innerHTML = "Name must be at least 3 characters.");
    }
    submitButton.disabled = false;
    return (infoText.innerHTML = "");
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        disabled={isDisabled}
      >
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>{content}</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label={inputLabel}
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <Typography
              id="infoText"
              variant="body2"
              color="error"
            ></Typography>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button id="submit" type="submit">
                {buttonText}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
