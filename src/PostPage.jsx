import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <>
      <main className="PostPage">
        <article className="post">
          {post && (
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
              <p>Thank You For Watching Full Post.</p>
              <br />
              <Link to={`/edit/${post.id}`}>
                <button className="update-btn">Update post</button>
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(post.id)}
              >
                Delete post
              </button>
            </>
          )}
          {!post && (
            <>
              <h2>Post not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>
                <Link to="/">Visit or Homepage</Link>
              </p>
            </>
          )}
        </article>
      </main>
    </>
  );
};

export default PostPage;
