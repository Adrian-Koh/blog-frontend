import { useEffect, useState } from "react";
import { getPosts } from "./user-posts";
import { useNavigate } from "react-router-dom";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    let fetchPosts = async () => {
      let result = await getPosts();
      setPosts(result);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <ul>
              <li>Title: {post.title}</li>
              <li>Text: {post.text}</li>
              <li>
                Upload time: {new Date(post.addedTime).toLocaleDateString()},{" "}
                {new Date(post.addedTime).toLocaleTimeString()}
              </li>
              {post.editedTime ? (
                <li>
                  Edited time: {new Date(post.editedTime).toLocaleDateString()},{" "}
                  {new Date(post.editedTime).toLocaleTimeString()}
                </li>
              ) : null}
              <li>
                <button
                  className="edit-post"
                  onClick={() =>
                    navigator("/posts/edit", {
                      state: {
                        post,
                      },
                    })
                  }
                >
                  &#x270E;
                </button>
              </li>
              <li>
                <button className="delete-post">&#x274C;</button>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UserPosts };
