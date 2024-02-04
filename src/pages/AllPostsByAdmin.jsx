/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useData from "../store";
import { useEffect } from "react";
import CardItem from "../components/CardItem";

const AllPostsByAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { allPosts, getAllPosts } = useData();
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <>
      {pathname === "/author" || pathname === "/user" ? null : (
        <Button
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      )}

      {allPosts !== null ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {allPosts.map((post) => (
            <Grid item xs={4} sm={4} md={4} key={post._id}>
              <CardItem post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Posts Not yet</Typography>
      )}
    </>
  );
};

export default AllPostsByAdmin;
