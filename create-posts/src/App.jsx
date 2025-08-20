import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="posts">My posts</Link>
        <Link to="login">Login</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
