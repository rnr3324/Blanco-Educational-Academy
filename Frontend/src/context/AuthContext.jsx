import { createContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    api.get("/api/admin/profile")
      .then(({ data }) => setAdmin(data.user))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/api/admin/login", { email, password });
    setAdmin(data.user);
    return data;
  };

  const logout = async () => {
    try { await api.post("/api/admin/logout"); }
    catch { /* The server may already have expired the session. */ }
    finally { setAdmin(null); }
  };

  return <AuthContext.Provider value={{ admin, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
