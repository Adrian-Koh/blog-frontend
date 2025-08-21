export async function getPosts() {
  // TODO: provide bearer token
  const response = await fetch("http://localhost:8000/posts/user");
  const parsed = await response.json();
  const posts = parsed.posts;
  console.log("posts: " + posts);

  return posts;
}
