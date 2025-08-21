import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenHeader } from "../token/token";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [publish, setPublish] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const tokenHeader = getTokenHeader();
    const response = await fetch("http://localhost:8000/posts/", {
      method: "POST",
      headers: { ...tokenHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ title, text, publish }),
    });

    const parsed = await response.json();
    console.log("response: " + JSON.stringify(parsed));
    navigate("/posts");
  }

  return (
    <div className="container">
      <h1>New post</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="text">Text: </label>
        <textarea
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <label htmlFor="publish">Publish: </label>
        <input
          type="checkbox"
          id="publish"
          checked={publish}
          onChange={(e) => setPublish(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export { PostForm };
