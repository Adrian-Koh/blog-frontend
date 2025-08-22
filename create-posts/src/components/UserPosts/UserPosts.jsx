import { useEffect, useState } from "react";
import { getPosts } from "./user-posts";
import { useNavigate } from "react-router-dom";
import styles from "./UserPosts.module.css";

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
      <ul className={styles.posts}>
        {posts.map((post) => (
          <li key={post.id}>
            <ul className={styles.post}>
              <li className={styles.postTitle}>{post.title}</li>
              <li className={styles.postText}>{post.text}</li>
              <li className={styles.postTime}>
                <div className={styles.clockIcon}>&#x1F550;:</div>
                <div>
                  {post.editedTime
                    ? `${new Date(post.editedTime).toDateString()}, 
                    ${new Date(post.editedTime).toLocaleTimeString([], {
                      hour12: true,
                    })}`
                    : `${new Date(post.addedTime).toDateString()}, 
                    ${new Date(post.addedTime).toLocaleTimeString([], {
                      hour12: true,
                    })}`}
                  {post.editedTime ? <i> (edited)</i> : null}
                </div>
              </li>
              <li className={styles.postButtons}>
                <button
                  className={styles.editPost}
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
                <button className={styles.deletePost}>&#x274C;</button>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UserPosts };
