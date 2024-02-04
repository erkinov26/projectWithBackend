/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, CssBaseline, Grid, TextField } from "@mui/material";
import instance from "../components/API";
import Cookies from "js-cookie";

export default function CreatePostModal({getAllMyPosts}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await instance
      .post(
        "/posts",
        JSON.stringify({
          title: data.get("title"),
          text: data.get("text"),
        }),
        {
          headers: {
            Authorization: `Baerer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
    handleClose();
    getAllMyPosts();
  };

  return (
    <div>
      <Button variant="outlined" sx={{ my: 2 }} onClick={handleOpen}>
        Create Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
              Create User
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="title"
                    label="Title"
                    id="title"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="text"
                    label="Text"
                    id="text"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create User
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}
