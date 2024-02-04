/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import useData from "../store";
import { useEffect, useState } from "react";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
const CardItem = ({ post }) => {
  const { deletePost, likePost, unlikePost } = useData();

  const location = useLocation();
  const pathname = location.pathname;
  const role = Cookies.get("role");
  return (
    <Card
      sx={{
        margin: "10px",
        maxWidth: 345,
        padding: "20px",
        minWidth: "400px",
        minHeight: "150px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.text}
        </Typography>
        {pathname === "/author" || pathname === "/user" ? null : (
          <Button
            onClick={() => {
              deletePost(post._id);
            }}
            color="error"
            variant="outlined"
            size="small"
            sx={{ my: 2 }}
          >
            Delete
          </Button>
        )}
      </CardContent>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={() => {
            likePost(post._id);
          }}
        >
          <FavoriteBorderOutlined />
        </Button>
        <Typography>{post.likes && post.likes.length}</Typography>
      </Box>
      <Typography textAlign={"right"} variant="body2" color="text.secondary">
        Post created by
      </Typography>
    </Card>
  );
};

export default CardItem;
