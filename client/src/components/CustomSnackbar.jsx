import { Snackbar, useTheme, useMediaQuery } from "@mui/material";

/**
 * A custom snackbar component to be used with the MUI Snackbar component.
 *
 * @param {boolean} open - Whether the snackbar is open or not.
 * @param {number} duration - The duration of the snackbar in milliseconds.
 * @param {string} content - The content of the snackbar.
 * @param {function} setOpen - A function to set the open state of the snackbar.
 *
 * @returns {React.ReactElement} A JSX element representing the snackbar.
 */
export default function CustomSnackbar({ open, duration, content, setOpen }) {
   const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let styles = isMobile? {
    position: "fixed",
    left: -300,
  } : {};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={content}
        sx={styles}
      />
    </div>
  );
}
