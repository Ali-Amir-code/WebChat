import { useRef } from "react";

import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupIcon from "@mui/icons-material/Group";

import AddUserModal from "./AddUserModal";
import ComingSoonModal from "./ComingSoonModal";

/**
 * A custom implementation of Material UI's SpeedDial component.
 * Provides a floating action button with 3 actions: Add User, Create Group, and Join Group.
 * The Add User action opens an AddUserModal, while the other two actions open a ComingSoonModal.
 * @function
 * @returns {ReactElement} A React element representing the custom SpeedDial component.
 */
export default function CustomSpeedDial() {
  const addUserRef = useRef();
  const comingSoonRef = useRef();

  const actions = [
    {
      icon: <PersonAddIcon />,
      name: "Add User",
      onClick: () => addUserRef.current.open(),
    },
    {
      icon: <GroupAddIcon />,
      name: "Create Group",
      onClick: () => comingSoonRef.current.open("Create Group is coming soon."),
    },
    {
      icon: <GroupIcon />,
      name: "Join Group",
      onClick: () => comingSoonRef.current.open("Join Group is coming soon."),
    },
  ];

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            sx={{ marginTop: 2 }}
            onClick={action.onClick}
            slotProps={{ tooltip: { title: action.name } }}
          />
        ))}
      </SpeedDial>

      <AddUserModal ref={addUserRef} />
      <ComingSoonModal ref={comingSoonRef} />
    </Box>
  );
}
