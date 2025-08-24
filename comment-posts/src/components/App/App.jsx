import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <nav className={styles.navBar}>
        <Link to="posts">Posts</Link>
        <Link to="login">Log In</Link>
        <Link to="signup">Sign Up</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
