import React, { createContext, useContext, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===============================
  // Store Token
  // ===============================
  const storeToken = (serverToken, userData = null) => {
  localStorage.setItem("token", serverToken);
  setToken(serverToken);

  if (userData) {
    setUser(userData); // 🔥 instant UI update
  }
};

  // ===============================
  // Logout
  // ===============================
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  // ===============================
  // Fetch User Profile
  // ===============================
  const fetchUserProfile = async (currentToken) => {
    console.log("AuthContext fetchUserProfile", { currentToken });
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("AuthContext profile fetch failed", { status: response.status, body: text });
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error("Auth Error:", err.message);
      setError(err.message);
      logoutUser(); // logout if token invalid
    }
  };

  // ===============================
  // Run on Token Change
  // ===============================
  useEffect(() => {
    const authenticateUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      await fetchUserProfile(token);
      setIsLoading(false);
    };

    authenticateUser();
  }, [token]);

  // ===============================
  // Context Value
  // ===============================
  const contextValue = {
    token,
    user,
    isLoading,
    error,
    isLoggedIn: !!token,
    isAdmin: user?.role === "admin",
    storeToken,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ===============================
// Custom Hook
// ===============================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};