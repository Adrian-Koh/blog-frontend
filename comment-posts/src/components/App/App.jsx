import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className="app">
      <nav className={styles.navBar}>
        <Link to="posts">Posts</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
