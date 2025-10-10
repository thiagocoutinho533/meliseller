// src/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // restaurar sessão do localStorage, se existir
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");
    if (token && userStr) {
      setUser(JSON.parse(userStr));
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const { data } = await api.post("/auth/login", { email, password });
    // espere do backend: { token, user: {id,name,email} }
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("auth_user", JSON.stringify(data.user));
    setUser(data.user);
  }

  async function register(name: string, email: string, password: string) {
    await api.post("/auth/register", { name, email, password });
    // Opcional: logar automaticamente após registrar:
    await login(email, password);
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
