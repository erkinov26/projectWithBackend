/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import instance from "../components/API";
import Cookies from "js-cookie";
import SignInForm from "../components/SignInForm";
import { useState } from "react";

const SignInUser = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await instance
      .post(
        "/auth/user/sign-in",
        JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        })
      )
      .then((res) => {
        console.log(res);
        if (res.data.data.role === "user") {
          Cookies.set("token", res.data.data.token);
          Cookies.set("role", res.data.data.role);
          navigate("/user");
          setErrorText(false);
        }
      })
      .catch((err) => setErrorText(true));
  };

  return (
    <SignInForm
      errorText={errorText}
      title="User"
      handleSubmit={handleSubmit}
    />
  );
};

export default SignInUser;
