/* eslint-disable react/prop-types */

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, Grid, TextField } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useData from "../store";

export default function UpdateUserModal(props) {
  const { user } = props;
  const userId = user._id;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstName, setFirstName] = React.useState(user.first_name || "");
  const [lastName, setLastName] = React.useState(user.last_name || "");
  const [email, setEmail] = React.useState(user.email || "");
  const [bio, setBio] = React.useState(user.bio || "");
  const [role, setRole] = React.useState(user.role || "");
  const [userName, setUserName] = React.useState(user.username || "");

  const updateUser = useData((state) => state.updateUser);
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatingUser = {
      bio: bio,
      email: email,
      role: role,
      first_name: firstName,
      last_name: lastName,
      username: userName,
    };
    updateUser(userId, updatingUser);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ my: 2, color: "#0094FF" }}
        onClick={handleOpen}
      >
        <BorderColorIcon />
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
              Update User
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="role"
                    required
                    fullWidth
                    id="role"
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    label="Username"
                    id="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    label="Bio"
                    id="bio"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update User
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}
