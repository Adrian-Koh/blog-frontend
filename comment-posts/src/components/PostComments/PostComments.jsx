import { useEffect, useState } from "react";
import {
  getAllPostComments,
  submitComment,
  editComment,
} from "./post-comments";
import styles from "./PostComments.module.css";
import { useOutletContext } from "react-router-dom";

const CommentInput = ({
  commentInput,
  setCommentInput,
  handleCommentSubmitClick,
}) => {
  return (
    <div className={styles.commentInputs}>
      <input
        type="text"
        placeholder="Add comment..."
        value={commentInput}
        onChange={(e) => {
          setCommentInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommentSubmitClick();
          }
        }}
      />
      <button onClick={() => handleCommentSubmitClick()}>Submit</button>
    </div>
  );
};

const PostComments = ({ postId = -1, postTitle }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [inputPosition, setInputPosition] = useState(-1);

  const { username } = useOutletContext();

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getAllPostComments(postId);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [postId]);

  function handleEditCommentClick(commentId) {
    // todo: this should be for edit submit not edit click
    //const newComment = await editComment(postId, commentId, commentInput)
  }

  function handleCommentSubmitClick() {
    const postComment = async () => {
      const createdComment = await submitComment(postId, commentInput);
      const newComments = [...comments, createdComment];
      console.log("newComments: " + JSON.stringify(newComments));

      setComments(newComments);
      setCommentInput("");
    };
    postComment();
  }

  return (
    <div>
      {postId === -1 ? null : (
        <div className={styles.comments}>
          {comments && comments.length > 0 ? (
            <div>
              <h2>{postTitle}</h2>
              <h3>Comments</h3>
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
                    {username && username === comment.user.username ? (
                      <img
                        className={styles.editCommentIcon}
                        src="/comment-edit-outline.svg"
                        alt="Edit comment"
                        onClick={() => handleEditCommentClick(comment.id)}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : (
            "No comments!"
          )}
          {inputPosition === -1 ? (
            <CommentInput
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              handleCommentSubmitClick={handleCommentSubmitClick}
            ></CommentInput>
          ) : null}
        </div>
      )}
    </div>
  );
};

export { PostComments };
