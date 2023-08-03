import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #7b7b7b",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  "&:focus": {
    outline: "none",
  },
};

function PopUpModal({setConfirmLogout,showModal,setShowModal,handleLogout}) {
  const [open, setOpen] = useState(showModal);
  const handleClose = () =>{
    setOpen(false);
    setShowModal(false)
  }

  const handleconfirmLogout = () => {
    setConfirmLogout(true)
    setShowModal(false)
  }

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
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to log out?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              All purchase data will be lost and the operation will not be
              finalized.
            </Typography>
            <Box mt={3}>
              <Button variant="outlined" size="small" sx={{ mr: 2 }} onClick={handleconfirmLogout}>
                Im sure
              </Button>
              <Button variant="outlined" size="small" onClick={handleClose}>
                Come Back
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default PopUpModal;
