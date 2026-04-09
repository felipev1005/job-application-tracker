import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();
console.log("AUTH API BASE URL:", API_BASE_URL);

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;
const TOKEN_KEY = "job_tracker_token";
const USER_KEY = "job_tracker_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  async function register(values) {
    try {
      setAuthLoading(true);
      setAuthError("");

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (err) {
      setAuthError(err.message || "Something went wrong during registration.");
      return { success: false };
    } finally {
      setAuthLoading(false);
    }
  }

  async function login(values) {
    try {
      setAuthLoading(true);
      setAuthError("");

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (err) {
      setAuthError(err.message || "Something went wrong during login.");
      return { success: false };
    } finally {
      setAuthLoading(false);
    }
  }

  function logout() {
    setToken("");
    setUser(null);
    setAuthError("");
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      authLoading,
      authError,
      register,
      login,
      logout,
    }),
    [token, user, authLoading, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}