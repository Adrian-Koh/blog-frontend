import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <nav>
        <Link to="posts">My posts</Link>
        <Link to="posts/new">New post</Link>
        <Link to="login">Log In</Link>
        <Link to="signup">Sign Up</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
