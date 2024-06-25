import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivatePages = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const state = {
    message: isLoggedIn
      ? ""
      : "You are not logged in yet, please fill the following fields to continue",
    from: location,
  };

  if (!isLoggedIn) return <Navigate to="/access/login" state={state} />;

  return children;
};

export default PrivatePages;
