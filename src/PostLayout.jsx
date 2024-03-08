import React from "react";
import { Link, Outlet } from "react-router-dom";

const PostLayout = () => {
  return (
    <>
      <Link to="/postpage/1">Post 1</Link>
      <Link to="/postpage/2">Post 2</Link>
      <Link to="/postpage/3">Post 3</Link>
      <br />

      <Link to="/postpage/newpost">NewPost</Link>

      <Outlet />
    </>
  );
};

export default PostLayout;
