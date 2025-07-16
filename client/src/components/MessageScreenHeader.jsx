import { Box, Button, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

/**
 * A component that displays a header for the message screen.
 *
 * The header displays the contact's name and type (single or group), and
 * contains a close button that calls the handleCloseScreen function when
 * clicked.
 *
 * @param {{name: string, type: string, handleCloseScreen: Function}} props
 * - The properties object.
 * @returns {JSX.Element}
 */
export default function MessageScreenHeader({name, type, handleCloseScreen}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        borderBottom: "1px solid #ccc",
      }}
    >
      <Box>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="caption">{type}</Typography>
      </Box>
      <Box>
        <Button onClick={handleCloseScreen}>
          <CloseIcon />
        </Button>
      </Box>
    </Box>
  );
}
