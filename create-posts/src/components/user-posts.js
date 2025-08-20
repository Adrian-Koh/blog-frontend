export async function getPosts() {
  const response = await fetch("http://localhost:8000/posts/");
  const parsed = await response.json();
  const posts = parsed.posts;
  console.log("posts: " + posts);

  return posts;
}
