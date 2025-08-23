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
          <div>
            <h2>Comments</h2>
            {comments.map((comment) => {
              return (
                <div className={styles.comment}>
                  <p>{comment.text}</p>
                  <p>{`${new Date(
                    comment.addedTime
                  ).toDateString()}, ${new Date(
                    comment.addedTime
                  ).toLocaleTimeString([], { hour12: true })}`}</p>
                </div>
              );
            })}
          </div>
        ) : (
          "No comments!"
        )}
      </div>
    </div>
  );
};

export { PostComments };
