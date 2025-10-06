import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <p>Bem-vindo, {user?.name || user?.email}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
