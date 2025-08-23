const getTokenHeader = () => {
  const token = localStorage.getItem("token");
  console.log("token obtained: " + token);

  if (!token) {
    throw new Error("Token not found.");
  }
  return { authorization: `Bearer ${token}` };
};

export { getTokenHeader };
