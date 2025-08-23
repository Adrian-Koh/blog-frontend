import { useEffect, useState } from "react";
import { getAllPostComments } from "./post-comments";
import styles from "./PostComments.module.css";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getAllPostComments(postId);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [postId]);

  return (
    <div>
      <div className={styles.comments}>
        {comments && comments.length > 0 ? (
          <ul>
            {comments.map((comment) => {
              return <li>{comment.text}</li>;
            })}
          </ul>
        ) : (
          "No comments!"
        )}
      </div>
    </div>
  );
};

export { PostComments };
