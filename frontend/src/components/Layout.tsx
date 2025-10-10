// src/components/Layout.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <img src="/logo.svg" width={28} height={28} /> <span>Meliseller</span>
        </div>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/integrations">Integrações</Link>
          {/* adicione outros menus aqui */}
        </nav>
        <div className="sidebar-footer">
          <small>{user?.email}</small>
          <button className="btn btn-sm btn-outline-light mt-2" onClick={logout}>
            Sair
          </button>
        </div>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  );
}
