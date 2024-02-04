/* eslint-disable react-hooks/exhaustive-deps */
import UsersTable from "./UsersTable";
import CreateUserModal from "./CreateUserModal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import useData from "../store";
import { useEffect } from "react";

const AdminPanel = () => {
  const { data, getData } = useData();

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate(-1);
    Cookies.remove("token");
    Cookies.remove("role");
  };
  return (
    <>
      <CreateUserModal />
      <Button
        onClick={() => {
          handleLogOut();
        }}
        variant="outlined"
        sx={{ my: 2 }}
      >
        Log Out
      </Button>

      <Button
        sx={{ mx: 2 }}
        variant="outlined"
        onClick={() => {
          navigate("/admin/allPosts");
        }}
      >
        All Posts
      </Button>
      <UsersTable data={data} />
    </>
  );
};

export default AdminPanel;
