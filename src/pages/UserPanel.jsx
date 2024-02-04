import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AllPostsByAdmin from "./AllPostsByAdmin";

const UserPanel = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          Cookies.remove("token");
          Cookies.remove("role");
          navigate(-1);
        }}
      >
        Log Out
      </Button>
      <AllPostsByAdmin />
    </>
  );
};

export default UserPanel;
