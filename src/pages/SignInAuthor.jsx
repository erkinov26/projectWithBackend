import instance from "../components/API";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SignInForm from "../components/SignInForm";
import { useState } from "react";

export default function SignInAuthor() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const response = await instance.post("/auth/author/sign-in", {
        username: data.get("username"),
        password: data.get("password"),
      });

      if (response.data.data.role === "author" && response.status === 200) {
        Cookies.set("token", response.data.data.token);
        Cookies.set("role", response.data.data.role);
        navigate("/author");
        setErrorText(false);
      }
    } catch (error) {
      setErrorText(true);
    }
  };

  return (
    <SignInForm
      errorText={errorText}
      title="Author"
      handleSubmit={handleSubmit}
    />
  );
}
