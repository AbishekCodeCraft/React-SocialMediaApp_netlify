import React, { useContext } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  seteditBody,
  editTitle,
  seteditTitle,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      seteditBody(post.body);
      seteditTitle(post.title);
    }
  }, [post, seteditBody, seteditTitle]);
  return (
    <>
      <main className="NewPost">
        {editTitle && (
          <>
            <h2>Update Post</h2>
            <form
              action=""
              className="newPostForm"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="postTitle">Title : </label>
              <input
                type="text"
                id="postTitle"
                required
                value={editTitle}
                onChange={(e) => seteditTitle(e.target.value)}
              />

              <label htmlFor="postBody">Post : </label>
              <input
                type="text"
                id="postBody"
                required
                value={editBody}
                onChange={(e) => seteditBody(e.target.value)}
              />

              <button type="submit" onClick={() => handleEdit(post.id)}>
                Submit
              </button>
            </form>
          </>
        )}

        {!editTitle && (
          <>
            <h2>Page not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit or Homepage</Link>{" "}
            </p>
          </>
        )}
      </main>
    </>
  );
};

export default EditPost;
