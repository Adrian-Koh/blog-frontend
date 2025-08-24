import { jwtDecode } from "jwt-decode";

const getTokenHeader = () => {
  const token = localStorage.getItem("token");
  console.log("token obtained: " + token);

  if (!token) {
    throw new Error("Token not found.");
  }
  return { authorization: `Bearer ${token}` };
};

function getUsernameFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    console.log("decoded token: " + JSON.stringify(decoded));

    return decoded.user.username;
  } catch {
    return null;
  }
}

export { getTokenHeader, getUsernameFromToken };
