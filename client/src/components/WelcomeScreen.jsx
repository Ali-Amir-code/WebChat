import { Box, Typography } from "@mui/material";

import {useUser} from "../hooks/useUser"

/**
 * A React component that renders a welcome screen for the user.
 * 
 * Displays a greeting with the user's username and a welcome message
 * using Material-UI components.
 *
 * @returns {JSX.Element} A JSX element representing the welcome screen.
 */

export default function WelcomeScreen() {
  const {user} = useUser();
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={'column'}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <Typography variant="h4">{`Hey ${user.username}`}</Typography>
        <Typography variant="h4">Welcome to WebChat</Typography>
      </Box>
    </>
  );
}
