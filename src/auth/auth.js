import { createContext, useContext, useState, useEffect } from "react";
import { getUser, postUser } from "../service/userService";

const AuthContext = createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    let mounted = true;
    async function init() {
      setLoading(true);
      try {
        const data = await getUser("users");
        if (!mounted) return;
        setUsers(Array.isArray(data) ? data : []);
        if (token) {
          const u = (Array.isArray(data) ? data : []).find(
            (x) => x.token === token
          );
          if (u) setCurrentUser(u.id);
        }
      } catch (err) {
        console.error("Load users failed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const list = users.length ? users : (await getUser("users")) || [];
      const found = list.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) {
        throw new Error("Email hoặc mật khẩu không đúng");
      }
      localStorage.setItem("token", found.token);
      setToken(found.token);
      setCurrentUser(found);
      return found;
    } finally {
      setLoading(false);
    }
  };

  // register
  const register = async (fullName, email, password) => {
    setLoading(true);
    try {
      const list = users.length ? users : (await getUser("users")) || [];
      if (list.find((u) => u.email === email)) {
        throw new Error("Email đã tồn tại");
      }
      const newToken =
        Date.now().toString(36) + Math.random().toString(36).slice(2);
      const newUser = {
        fullName: fullName,
        email: email,
        password: password,
        token: newToken,
      };
      const created = await postUser("users", newUser);
      setUsers((prev) => [...prev, created]);
      setToken(created.token);
      setCurrentUser(created);
      return created;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    users,
    token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
