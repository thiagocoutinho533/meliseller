// src/pages/Dashboard.tsx
import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h2 className="mb-3">Dashboard</h2>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Bem-vindo 👋</h5>
            <p>Este é o seu painel principal. Em breve: métricas, pedidos, etc.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
