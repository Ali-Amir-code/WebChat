import { useRef } from "react";
import { Button } from "@mui/material";
import ComingSoonModal from "./ComingSoonModal";

/**
 * A button component that triggers a "coming soon" modal.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.text - The text to display on the button and in the modal message.
 * 
 * Utilizes a ref to control the ComingSoonModal's open state, 
 * displaying a message indicating that a feature is coming soon.
 */

export default function ComingSoonButton({ text }) {
  const modalRef = useRef();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => modalRef.current.open(`${text} is coming soon!`)}
      >
        {text}
      </Button>
      <ComingSoonModal ref={modalRef} />
    </>
  );
}
