import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserPosts } from "./components/UserPosts/UserPosts.jsx";
import { Login } from "./components/Login/Login.jsx";
import { Signup } from "./components/Signup/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "posts", element: <UserPosts /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
