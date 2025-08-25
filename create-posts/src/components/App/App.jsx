import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../token/token";
import styles from "./App.module.css";

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
          <Link to="posts">My posts</Link>
          <Link to="posts/new">New post</Link>
          <Link to="login">Log In</Link>
          <Link to="signup">Sign Up</Link>
        </nav>
        <div className={styles.loggedIn}>
          <img
            className={styles.loggedInUserIcon}
            src="/account-circle.svg"
            alt="Logged in account"
          />
          {username ? username : "not logged in"}
        </div>
      </div>

      <Outlet context={{ updateLoggedInUser, username }}></Outlet>
    </div>
  );
}
