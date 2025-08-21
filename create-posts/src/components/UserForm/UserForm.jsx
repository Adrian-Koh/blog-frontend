import { useEffect, useState } from "react";

const UserForm = ({ action }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/users/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const parsed = await response.json();

    if (action === "login") {
      const token = parsed.token;
      localStorage.setItem("token", token);
    } else if (action === "signup") {
      // check for error
    }
  }

  useEffect(() => {
    if (action === "login") {
      setTitle("Log In");
    } else if (action === "signup") {
      setTitle("Sign Up");
    }
  }, [action]);

  return (
    <div className="container">
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export { UserForm };
