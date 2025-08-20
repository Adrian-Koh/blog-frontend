import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import UserPosts from "./components/UserPosts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserPosts />
  </StrictMode>
);
