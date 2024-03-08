import React, { useEffect, useState } from "react";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Home from "./Home";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import API from "./api/Posts";
import EditPost from "./EditPost";
import useWindowSize from "./Hooks/useWindowSize";
import useAxiosFetch from "./Hooks/useAxiosFetch";

const App = () => {
  const [posts, setposts] = useState([]);

  const [search, setsearch] = useState("");

  const [searchResults, setsearchResults] = useState([]);

  const [postTitle, setPostTitle] = useState("");

  const [postBody, setPostBody] = useState("");

  const [editTitle, seteditTitle] = useState("");

  const [editBody, seteditBody] = useState("");

  const navigate = useNavigate();

  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setposts(data);
  }, [data]);

  useEffect(() => {
    const filteredRecords = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchResults(filteredRecords.reverse());
  }, [posts, search]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await API.post("/posts", newPost);

      const allPosts = [...posts, response.data];
      setposts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error : ${err.message}`);
      }
    }
  };

  const handelEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };

    try {
      const response = await API.put(`/posts/${id}`, updatedPost);
      setposts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      seteditTitle("");
      seteditBody("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error : ${err.message}`);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setposts(postsList);
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error : ${err.message}`);
      }
    }
  };

  return (
    <div className="App">
      <Header title="Project Social Media" width={width} />

      <Nav search={search} setsearch={setsearch} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handlesubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>

        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handelEdit}
              editBody={editBody}
              seteditBody={seteditBody}
              editTitle={editTitle}
              seteditTitle={seteditTitle}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
