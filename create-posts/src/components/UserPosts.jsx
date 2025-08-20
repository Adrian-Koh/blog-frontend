import { useEffect, useState } from "react";
import { getPosts } from "./user-posts";

export default function UserPosts() {
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
      <ul>
        {posts.map((post) => (
          <li>
            <ul>
              <li>{post.title}</li>
              <li>{post.text}</li>
              <li>{post.addedTime}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
