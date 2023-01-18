const isIdTokenSaved = () => {
  const idToken = localStorage.getItem("idToken");
  if (idToken) return true;
  return false;
};

export default isIdTokenSaved;
