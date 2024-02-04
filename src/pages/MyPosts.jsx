import { useEffect, useState } from "react";
import CreatePostModal from "../components/CreatedPostModal";
import instance from "../components/API";
import Cookies from "js-cookie";
import CardItem from "../components/CardItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();
  console.log("🚀 ~ MyPosts ~ myPosts:", myPosts);
  const getAllMyPosts = async () => {
    await instance
      .get("/posts/my", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => setMyPosts(res.data.data))
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    getAllMyPosts();
  }, []);
  return (
    <>
      <CreatePostModal getAllMyPosts={getAllMyPosts} />
      <Button
        onClick={() => {
          navigate(-1);
        }}
        variant="outlined"
        sx={{ my: 2, mr: 2 }}
      >
        Back
      </Button>
      {myPosts && myPosts.length > 0
        ? myPosts.map((post, i) => <CardItem key={i} post={post} />)
        : "Posts not available yet"}
    </>
  );
};

export default MyPosts;
