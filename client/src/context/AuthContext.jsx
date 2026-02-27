import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Determine API base URL
  const API_BASE = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    if (token) {
      const savedUsername = localStorage.getItem("username");
      setUser(savedUsername ? { username: savedUsername } : null);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  // LOGIN
  const login = async (username, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    // If backend returns HTML or empty body, this will throw
    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Server returned invalid response");
    }

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);

    setToken(data.token);
    setUser({ username });
  };

  // TOKEN-ONLY LOGIN (signup flow)
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