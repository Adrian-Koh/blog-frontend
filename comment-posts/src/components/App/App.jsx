import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../token/token";

export default function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedInUsername = getUsernameFromToken();
    if (loggedInUsername) setUsername(loggedInUsername);
  }, []);

  const updateLoggedInUser = (uname) => {
    setUsername(uname);
  };
  return (
    <div className={styles.app}>
      <div className={styles.navBar}>
        <nav className={styles.navLinks}>
          <Link to="posts">Posts</Link>
          <Link to="login">Log In</Link>
          <Link to="signup">Sign Up</Link>
        </nav>
        <div className={styles.loggedIn}>
          {username ? "Logged in: " + username : "not logged in"}
        </div>
      </div>

      <Outlet context={{ updateLoggedInUser }}></Outlet>
    </div>
  );
}
