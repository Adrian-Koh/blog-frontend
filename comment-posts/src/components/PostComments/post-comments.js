import { getTokenHeader } from "../token/token";

export async function getAllPostComments(postId) {
  const response = await fetch(
    `http://localhost:8000/posts/${postId}/comments`
  );
  const parsed = await response.json();
  console.log(`comments of post ${postId}: ${JSON.stringify(parsed.comments)}`);
  return parsed.comments;
}

async function getCommentWithUser(postId, commentId) {
  const response = await fetch(
    `http://localhost:8000/posts/${postId}/comments/${commentId}`
  );
  const parsed = await response.json();
  console.log(`comment with user: ${JSON.stringify(parsed.comment)}`);

  return parsed.comment;
}

export async function submitComment(postId, comment) {
  const tokenHeader = getTokenHeader();

  const response = await fetch(
    `http://localhost:8000/posts/${postId}/comments`,
    {
      method: "POST",
      headers: { ...tokenHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ comment: comment }),
    }
  );

  const parsed = await response.json();
  console.log(`comment created: ${JSON.stringify(parsed.comment)}`);

  return await getCommentWithUser(postId, parsed.comment.id);
}

export async function editComment(postId, commentId, newComment) {
  const tokenHeader = getTokenHeader();

  const response = await fetch(
    `http://localhost:8000/posts/${postId}/comments/${commentId}`,
    {
      method: "PUT",
      headers: { ...tokenHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ comment: newComment }),
    }
  );

  const parsed = await response.json();
  console.log(`comment edited: ${JSON.stringify(parsed.comment)}`);

  return await getCommentWithUser(postId, parsed.comment.id);
}
