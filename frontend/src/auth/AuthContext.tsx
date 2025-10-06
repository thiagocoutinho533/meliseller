import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Ajusta a base da API. Em produção, defina VITE_API_URL no .env do frontend.
// Ex.: VITE_API_URL=https://integraseller.com.br/api
const API_BASE = (import.meta.env.VITE_API_URL as string) || "/api";

type User = {
  id: string;
  name?: string | null;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // carrega token do localStorage na inicialização
  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    if (t) setToken(t);
    setLoading(false);
  }, []);

  // quando tiver token, busca /me
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Falha ao carregar usuário");
        const data = (await res.json()) as User;
        setUser(data);
      } catch {
        // token inválido
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth_token");
      }
    })();
    return () => controller.abort();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Credenciais inválidas");
    }
    const data = (await res.json()) as { token: string };
    localStorage.setItem("auth_token", data.token);
    setToken(data.token);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Falha no cadastro");
    }
    // opcional: já fazer login automático
    await login(email, password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider />");
  return ctx;
}
