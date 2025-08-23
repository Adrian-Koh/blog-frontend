import { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import { getAllPosts } from "./posts";
import { PostComments } from "../PostComments/PostComments";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  function handleCommentsClick(postId) {}

  return (
    <div className={styles.container}>
      <h1>All Posts</h1>
      <div className={styles.posts}>
        {posts.map((post) => {
          return (
            <div className={styles.post} key={post.id}>
              <div className={styles.postTitle}>{post.title}</div>
              <div className={styles.postText}>{post.text}</div>
              <div className={styles.postPublished}>
                {post.isPublished ? "Published" : "Not published"}
              </div>
              <div className={styles.postAddedTime}>{`${new Date(
                post.addedTime
              ).toDateString()}, ${new Date(post.addedTime).toLocaleTimeString(
                [],
                { hour12: true }
              )}`}</div>
              {post.editedTime ? (
                <div className={styles.postEditedTime}>
                  {`${new Date(post.editedTime).toDateString()}, ${new Date(
                    post.editedTime
                  ).toLocaleTimeString([], { hour12: true })}`}{" "}
                  edited
                </div>
              ) : null}
              <button onClick={() => handleCommentsClick(post.id)}>
                Comments
              </button>
              <PostComments postId={post.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Posts };
