import * as React from "react";

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

import { useUser } from "../hooks/useUser";

/**
 * A React component that renders a dialog with a text input for a username
 * and a submit button. The component handles the form submission and the
 * input's change event. The component also handles the server response and
 * displays success/error messages accordingly.
 *
 * @returns {JSX.Element} A JSX element representing the login dialog.
 * @example
 * <Login />
 */
export default function Login() {
  const { user, setUser } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, id: user.id }),
      });
      const data = await res.json();
      if (data.success) {
        return setUser((user) => ({ ...user, username }));
      }
      const infoText = document.getElementById("infoText");
      return (infoText.innerHTML = data.message);
    } catch (e) {
      console.log(e);
    }
  };
  /**
   * Handles the change event of the input field in the dialog.
   * Disables the submit button if the input is empty, contains spaces, or is shorter than 3 characters.
   * Enables the submit button otherwise.
   *
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
      return (infoText.innerHTML = "Username cannot contain spaces.");
    }
    if (event.target.value.length < 3) {
      submitButton.disabled = true;
      return (infoText.innerHTML = "Username must be at least 3 characters.");
    }
    submitButton.disabled = false;
    return (infoText.innerHTML = "");
  };

  return (
    <React.Fragment>
      <Dialog open={true}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>Please enter a username.</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <Typography
              variant="body2"
              id="infoText"
              color="error"
            ></Typography>
            <DialogActions>
              <Button type="submit" id="submit" loading={!user.id}>
                Login
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
