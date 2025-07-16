import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ComingSoonModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    /**
     * Opens the modal with the given message.
     * @param {string} msg The message to display in the modal.
     */
    open: (msg) => {
      setMessage(msg);
      setOpen(true);
    },
  }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Coming Soon</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message || "This feature will be available soon."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

export default ComingSoonModal;