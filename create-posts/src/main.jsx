import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserPosts } from "./components/UserPosts/UserPosts.jsx";
import { UserForm } from "./components/UserForm/UserForm.jsx";
import { PostForm } from "./components/PostForm/PostForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "posts", element: <UserPosts /> },
      { path: "posts/new", element: <PostForm isNewPost={true} /> },
      { path: "posts/edit", element: <PostForm isNewPost={false} /> },
      { path: "login", element: <UserForm action="login" /> },
      { path: "signup", element: <UserForm action="signup" /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
