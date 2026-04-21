import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import API from "../api/axios";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {

      const res = await API.get("/auth/me/");

      setUser(res.data);
    } catch (err) {
      console.log("ME ERROR:", err.response?.data || err.message);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (accessToken) => {
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};