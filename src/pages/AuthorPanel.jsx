/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AllPostsByAdmin from "./AllPostsByAdmin";
const AuthorPanel = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate(-1);
    Cookies.remove("token");
    Cookies.remove("role");
  };
  return (
    <>
      <Button
        sx={{ mr: 2, my: 2 }}
        variant="outlined"
        onClick={() => {
          navigate("my-posts");
        }}
      >
        My Posts
      </Button>
      <Button
        sx={{ m: 2 }}
        variant="outlined"
        onClick={() => {
          handleLogOut();
        }}
      >
        Log Out
      </Button>
      <AllPostsByAdmin />
    </>
  );
};

export default AuthorPanel;
