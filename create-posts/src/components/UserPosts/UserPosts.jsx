import { useEffect, useState } from "react";
import { getPosts } from "./user-posts";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);

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
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UserPosts };
