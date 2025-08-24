import { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import { getAllPosts } from "./posts";
import { PostComments } from "../PostComments/PostComments";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [commentsPostId, setCommentsPostId] = useState(-1);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  function handleCommentsClick(postId) {
    setCommentsPostId(postId);
  }

  return (
    <div className={styles.container}>
      <div className={styles.postsContainer}>
        <h1>All Posts</h1>
        <div className={styles.posts}>
          {posts.map((post) => {
            return post.isPublished ? (
              <div className={styles.post} key={post.id}>
                <div className={styles.postTitle}>{post.title}</div>
                <div className={styles.postAuthor}>
                  <img
                    className={styles.userIcon}
                    src="/account.svg"
                    alt=" post author"
                  ></img>
                  {post.user.username}
                </div>
                <div className={styles.postText}>{post.text}</div>
                <div className={styles.postAddedTime}>
                  <i>posted </i>
                  {`${new Date(post.addedTime).toDateString()}, ${new Date(
                    post.addedTime
                  ).toLocaleTimeString([], { hour12: true })}`}
                </div>
                {post.editedTime ? (
                  <div className={styles.postEditedTime}>
                    <i>edited </i>
                    {`${new Date(post.editedTime).toDateString()}, ${new Date(
                      post.editedTime
                    ).toLocaleTimeString([], { hour12: true })}`}
                  </div>
                ) : null}
                <img
                  src="/comment.svg"
                  alt="comment"
                  className={styles.commentsIcon}
                  onClick={() => handleCommentsClick(post.id)}
                />
              </div>
            ) : null;
          })}
        </div>
      </div>
      <PostComments
        postId={commentsPostId}
        postTitle={
          posts.length > 0 && commentsPostId > -1
            ? posts.find((post) => post.id === commentsPostId).title
            : ""
        }
      />
    </div>
  );
};

export { Posts };
