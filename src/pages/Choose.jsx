/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useData from "../store";

const Choose = () => {
  const navigate = useNavigate();
  const { getRole } = useData();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Button
        onClick={() => {
          getRole("admin");
          navigate("/signin/admin");
        }}
        sx={{ m: 2 }}
        variant="contained"
      >
        Sign In as Admin
      </Button>
      <Button
        onClick={() => {
          getRole("user");
          navigate("/signin/user");
        }}
        sx={{ m: 2 }}
        variant="contained"
      >
        Sign In as User
      </Button>
      <Button
        onClick={() => {
          getRole("author");
          navigate("/signin/author");
        }}
        sx={{ m: 2 }}
        variant="contained"
      >
        Sign In as Author
      </Button>
    </Box>
  );
};

export default Choose;
