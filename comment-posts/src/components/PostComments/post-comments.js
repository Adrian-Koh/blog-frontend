import { getTokenHeader } from "../token/token";

export async function getAllPostComments(postId) {
  const response = await fetch(
    `http://localhost:8000/posts/${postId}/comments`
  );
  const parsed = await response.json();
  console.log(`comments of post ${postId}: ${JSON.stringify(parsed.comments)}`);
  return parsed.comments;
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

  const commentWithUserResponse = await fetch(
    `http://localhost:8000/posts/${postId}/comments/${parsed.comment.id}`
  );
  const commentWithUserParsed = await commentWithUserResponse.json();
  console.log(
    `comment with user: ${JSON.stringify(commentWithUserParsed.comment)}`
  );

  return commentWithUserParsed.comment;
}
