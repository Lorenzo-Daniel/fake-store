import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "320px",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "1px solid #7b7b7b",
  borderRadius: "5px",
  boxShadow: 24,
  p: 1,
  "&:focus": {
    outline: "none",
  },
};

function ModalForm({ children, showModal }) {
  const [open, setOpen] = useState(showModal);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default ModalForm;
