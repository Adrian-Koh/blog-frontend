import { useEffect, useState } from "react";
import { getAllPostComments } from "./post-comments";
import styles from "./PostComments.module.css";

const PostComments = ({ postId = -1 }) => {
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
      {postId === -1 ? null : (
        <div className={styles.comments}>
          {comments && comments.length > 0 ? (
            <div>
              <h2>Comments</h2>
              {comments.map((comment) => {
                return (
                  <div className={styles.comment}>
                    <div className={styles.commentTime}>
                      {comment.editedTime
                        ? `${new Date(comment.editedTime).toDateString()},`
                        : `${new Date(comment.addedTime).toDateString()},`}
                      <br />
                      {comment.editedTime
                        ? `${new Date(comment.editedTime).toLocaleTimeString(
                            [],
                            { hour12: true }
                          )} (edited)`
                        : `${new Date(comment.addedTime).toLocaleTimeString(
                            [],
                            { hour12: true }
                          )}`}
                    </div>
                    <div className={styles.commentAuthor}>
                      {comment.user.username}:
                    </div>
                    <div className={styles.commentText}>{comment.text}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            "No comments!"
          )}
          <div className={styles.commentInputs}>
            <input type="text" placeholder="Add comment..." />
            <button>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export { PostComments };
