/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import useData from "../store";

export default function DeleteModal({ userId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { deleteUserByAdmin, deleteUsersAllPosts } = useData();

  return (
    <>
      <Button
        color="error"
        variant="outlined"
        sx={{ my: 2 }}
        onClick={handleOpen}
      >
        <DeleteOutline />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              backgroundColor: "#fff",
              padding: "15px 30px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Are You sure?
            </Typography>
            <Box>
              <Button
                color="error"
                variant="outlined"
                sx={{ display: "inline", m: 2 }}
                onClick={() => {
                  deleteUserByAdmin(userId);
                  deleteUsersAllPosts(userId);
                  handleClose();
                }}
              >
                Yes
              </Button>
              <Button
                color="success"
                sx={{ display: "inline", m: 2 }}
                variant="outlined"
                onClick={() => {
                  handleClose();
                }}
              >
                No
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
