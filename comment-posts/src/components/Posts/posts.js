export async function getAllPosts() {
  const response = await fetch("http://localhost:8000/posts/");
  const parsed = await response.json();
  console.log("posts: " + JSON.stringify(parsed.posts));
  return parsed.posts;
}

export async function getAllPostComments(postId) {
  const response = await fetch(
    `http://localhost:8000/posts/${postId}/comments`
  );
  const parsed = await response.json();
  console.log(`comments of post ${postId}: ${JSON.stringify(parsed.comments)}`);
  return parsed.comments;
}
