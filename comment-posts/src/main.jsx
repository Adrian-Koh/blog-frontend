import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Posts } from "./components/Posts/Posts.jsx";
import { UserForm } from "./components/UserForm/UserForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "posts", element: <Posts /> },
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
