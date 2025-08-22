export async function getAllPosts() {
  const response = await fetch("http://localhost:8000/posts/");
  const parsed = await response.json();
  console.log("posts: " + JSON.stringify(parsed.posts));
  return parsed.posts;
}
