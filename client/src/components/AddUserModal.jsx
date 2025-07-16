import { useState, forwardRef, useImperativeHandle } from "react";
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

import CustomSnackbar from "./CustomSnackbar";

import { useUser } from "../hooks/useUser";
import { useContacts } from "../hooks/useContacts";
import { usePendingRequests } from "../hooks/usePending";

const AddUserModal = forwardRef((props, ref) => {

  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");

  const { user } = useUser();
  const { contacts } = useContacts();
  const { pendingRequests, setPendingRequests } = usePendingRequests();

  useImperativeHandle(ref, () => ({
    open: () => setOpenModal(true),
  }));

  const handleClose = () => setOpenModal(false);

/**
 * Handles the submission of the add user form.
 * Prevents the default form submission behavior.
 * Retrieves the username from the form input and checks against current user, existing contacts, and pending requests.
 * Provides appropriate feedback via a snackbar if the action is invalid (e.g., adding oneself, adding an existing contact, or pending reciprocal request).
 * Attempts to send an add user request to the server if valid, updates pending requests, and displays success/error messages accordingly.
 *
 * @param {Event} event - The form submission event.
 */

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const infoText = document.getElementById("infoText");

    if (username === user.username) {
      setSnackbarContent("You cannot add yourself");
      setOpenSnackbar(true);
      handleClose();
      return;
    }

    if (contacts.find((c) => c.username === username)) {
      setSnackbarContent("That user is already added");
      setOpenSnackbar(true);
      handleClose();
      return;
    }

    const contact = pendingRequests.find((c) => c.username === username);
    if (contact && contact.type === "recieved") {
      setSnackbarContent(
        "Hey! that user also sent you request. Respond to that."
      );
      
      setOpenSnackbar(true);
      handleClose();
      return;
    }

    try {
      const res = await fetch("/api/addUserRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ for: username, from: user.username }),
      });
      const data = await res.json();
      if (data.success) {
        setPendingRequests((prev) => [...prev, { username, type: "sent" }]);
        setSnackbarContent("Request sent successfully");
        setOpenSnackbar(true);
        handleClose();
        return;
      }
      infoText.innerHTML = data.message;
    } catch {
      infoText.innerHTML = "Something went wrong";
    }
  };

/**
 * Handles changes in the input field for username.
 * Disables the submit button and displays appropriate messages if the input is empty,
 * contains spaces, or is shorter than 3 characters. Enables the submit button otherwise.
 *
 * @param {Event} event - The input change event.
 */

  const handleChange = (event) => {
    const infoText = document.getElementById("infoText");
    const submitButton = document.getElementById("submit");
    const value = event.target.value;
    if (!value) {
      submitButton.disabled = true;
      infoText.innerHTML = "";
      return;
    }
    if (value.includes(" ")) {
      submitButton.disabled = true;
      infoText.innerHTML = "Username cannot contain spaces.";
      return;
    }
    if (value.length < 3) {
      submitButton.disabled = true;
      infoText.innerHTML = "Username must be at least 3 characters.";
      return;
    }
    submitButton.disabled = false;
    infoText.innerHTML = "";
  };

  return (
    <>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Enter the Username of the user you want to add
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="User Name"
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
                Add User
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <CustomSnackbar
        open={openSnackbar}
        duration={5000}
        content={snackbarContent}
        setOpen={setOpenSnackbar}
      />
    </>
  );
});

export default AddUserModal;
