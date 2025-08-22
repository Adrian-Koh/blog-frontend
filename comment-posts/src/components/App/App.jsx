import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <nav>
        <Link to="posts">Posts</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
