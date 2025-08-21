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
