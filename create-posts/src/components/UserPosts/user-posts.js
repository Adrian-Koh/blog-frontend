import { getTokenHeader } from "../token/token";

export async function getPosts() {
  const response = await fetch("http://localhost:8000/posts/user", {
    headers: getTokenHeader(),
  });

  const parsed = await response.json();
  const posts = parsed.posts;
  console.log("posts: " + JSON.stringify(posts));
  console.log("returned user: " + JSON.stringify(parsed.user));

  return posts;
}

export async function updatePublishStatus(postId, newPublishStatus) {
  const tokenHeader = getTokenHeader();
  const response = await fetch(`http://localhost:8000/posts/${postId}`, {
    method: "PUT",
    headers: { ...tokenHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ publish: newPublishStatus }),
  });

  const parsed = await response.json();
  console.log("response: " + JSON.stringify(parsed));
  return parsed.post;
}
