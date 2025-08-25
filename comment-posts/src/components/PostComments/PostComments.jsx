import { useEffect, useState } from "react";
import {
  getAllPostComments,
  submitComment,
  editComment,
  deleteComment,
} from "./post-comments";
import styles from "./PostComments.module.css";
import { useOutletContext } from "react-router-dom";

const CommentInput = ({
  mode,
  commentInputText = "",
  handleCommentSubmitClick,
}) => {
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    setCommentInput(commentInputText);
  }, [commentInputText]);

  return (
    <div className={styles.commentInputs}>
      <input
        type="text"
        placeholder={mode === "new" ? "Add comment..." : "Edit comment..."}
        value={commentInput}
        onChange={(e) => {
          setCommentInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommentSubmitClick(commentInput);
          }
        }}
      />
      <button
        className={styles.submitBtn}
        onClick={() => handleCommentSubmitClick(commentInput)}
      >
        Submit
      </button>
    </div>
  );
};

const PostComments = ({ postId = -1, postTitle }) => {
  const [comments, setComments] = useState([]);
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
    setInputPosition(commentId);
  }

  function handleCommentSubmit(inputText) {
    const submitCommentCb = async () => {
      const createdComment = await submitComment(postId, inputText);
      const newComments = [...comments, createdComment];
      console.log("newComments: " + JSON.stringify(newComments));

      setComments(newComments);
    };
    submitCommentCb();
  }

  function handleCommentEditSubmit(commentId, inputText) {
    const editCommentCb = async () => {
      const editedComment = await editComment(postId, commentId, inputText);
      let newComments = comments.filter((comment) => comment.id !== commentId);
      newComments = [...newComments, editedComment];
      newComments.sort((a, b) => a.id - b.id);
      console.log("newComments: " + JSON.stringify(newComments));

      setComments(newComments);
      setInputPosition(-1);
    };
    editCommentCb();
  }

  function handleDeleteCommentClick(commentId) {
    const deleteCommentCb = async () => {
      const deletedComment = await deleteComment(postId, commentId);
      const newComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      console.log("deletedComment: " + JSON.stringify(deletedComment));
      console.log("newComments: " + JSON.stringify(newComments));

      setComments(newComments);
      setInputPosition(-1);
    };
    deleteCommentCb();
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
                      <div className={styles.commentIcons}>
                        <img
                          className={styles.editCommentIcon}
                          src="/comment-edit-outline.svg"
                          alt="Edit comment"
                          onClick={() => handleEditCommentClick(comment.id)}
                        />
                        <img
                          className={styles.deleteCommentIcon}
                          src="/delete.svg"
                          alt="Delete comment"
                          onClick={() => handleDeleteCommentClick(comment.id)}
                        />
                      </div>
                    ) : null}
                    {inputPosition === comment.id ? (
                      <CommentInput
                        mode="edit"
                        commentInputText={comment.text}
                        handleCommentSubmitClick={(inputText) => {
                          handleCommentEditSubmit(comment.id, inputText);
                        }}
                      ></CommentInput>
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
              mode="new"
              handleCommentSubmitClick={(inputText) =>
                handleCommentSubmit(inputText)
              }
            ></CommentInput>
          ) : (
            <button
              className={styles.newCommentBtn}
              onClick={() => setInputPosition(-1)}
            >
              New comment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export { PostComments };
