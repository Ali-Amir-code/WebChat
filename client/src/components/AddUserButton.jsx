import { useRef } from "react";
import { Button } from "@mui/material";
import AddUserModal from "./AddUserModal";

/**
 * A button component that opens the AddUserModal when clicked.
 * Utilizes a ref to control the modal's open state.
 */

export default function AddUserButton() {
  const modalRef = useRef();

  return (
    <>
      <Button variant="contained" onClick={() => modalRef.current.open()}>
        Add User
      </Button>
      <AddUserModal ref={modalRef} />
    </>
  );
}
