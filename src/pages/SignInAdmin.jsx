/* eslint-disable no-unused-vars */
import instance from "../components/API";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SignInForm from "../components/SignInForm";
import { useState } from "react";

export default function SignInAdmin() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await instance
      .post(
        "/auth/admin/sign-in",
        JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        })
      )
      .then((res) => {
        if (res.data.data.role === "admin") {
          Cookies.set("token", res.data.data.token);
          Cookies.set("role", res.data.data.role);
          navigate("/admin");
          setErrorText(false);
        }
      })
      .catch((err) => setErrorText(true));
  };

  return (
    <SignInForm
      errorText={errorText}
      title="Admin"
      handleSubmit={handleSubmit}
    />
  );
}
