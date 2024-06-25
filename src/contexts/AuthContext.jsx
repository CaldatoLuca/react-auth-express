import React, { useState, useContext, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../utils/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (payload) => {
    const from = location.state?.from?.pathname || "/";
    try {
      const response = await instance.post(`/auth/login`, payload);
      const user = response.data.user;
      setUser(user);
      setIsLoggedIn(true);
      navigate(from);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const register = async (payload) => {
    const from = location.state?.from?.pathname || "/";
    try {
      const response = await instance.post(`/auth/register`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const user = response.data.user;
      setUser(user);
      setIsLoggedIn(true);
      navigate(from);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
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
