import { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import { getAllPosts } from "./posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>All Posts</h1>
      {posts.map((post) => {
        return (
          <ul key={post.id}>
            <li>{post.title}</li>
            <li>{post.text}</li>
            <li>{post.isPublished ? "Published" : "Not published"}</li>
            <li>{post.addedTime}</li>
            <li>{post.editedTime}</li>
          </ul>
        );
      })}
    </div>
  );
};

export { Posts };
