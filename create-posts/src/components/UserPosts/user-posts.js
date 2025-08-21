export async function getPosts() {
  const token = localStorage.getItem("token");
  console.log("token obtained: " + token);

  if (!token) {
    throw new Error("Token not found.");
  }

  const response = await fetch("http://localhost:8000/posts/user", {
    headers: { authorization: `Bearer ${token}` },
  });

  const parsed = await response.json();
  const posts = parsed.posts;
  console.log("posts: " + posts);
  console.log("returned user: " + JSON.stringify(parsed.user));

  return posts;
}
