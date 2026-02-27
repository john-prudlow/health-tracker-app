import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const savedUsername = localStorage.getItem("username");
      setUser(savedUsername ? { username: savedUsername } : null);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  // -----------------------------
  // EXISTING LOGIN — DO NOT TOUCH
  // -----------------------------
  const login = async (username, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);

    setToken(data.token);
    setUser({ username });
  };

  // -----------------------------------------
  // TOKEN-ONLY LOGIN FOR SIGNUP FLOW
  // -----------------------------------------
  const loginWithToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);

    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUser({ username: savedUsername });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        loginWithToken,
        logout,
        isAuthenticated: !!token,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);