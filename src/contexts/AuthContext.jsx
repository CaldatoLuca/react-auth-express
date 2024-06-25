import React, { useState, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../utils/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = (user, token) => {
    setIsLoggedIn(true);
    setUser(user);
    setToken(token);
    const from = location.state?.from?.pathname || "/";
    navigate(from);
  };

  const register = (user, token) => {
    setIsLoggedIn(true);
    setUser(user);
    setToken(token);
    const from = location.state?.from?.pathname || "/";
    navigate(from);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const values = {
    isLoggedIn,
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
