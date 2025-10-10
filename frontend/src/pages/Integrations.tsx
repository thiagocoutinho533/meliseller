// src/pages/Integrations.tsx
import Layout from "../components/Layout";
import api from "../services/api";
import { useState } from "react";

export default function Integrations() {
  const [loading, setLoading] = useState(false);

  async function connectML() {
    try {
      setLoading(true);
      // backend devolve a URL de autorização do ML
      const { data } = await api.get("/ml/auth-url");
      window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h2>Integrações</h2>

      <div className="card p-3 mt-3">
        <h5>Mercado Livre</h5>
        <p>Conecte sua conta para sincronizar anúncios, pedidos, etc.</p>
        <button className="btn btn-warning" onClick={connectML} disabled={loading}>
          {loading ? "Redirecionando..." : "Conectar Mercado Livre"}
        </button>
      </div>
    </Layout>
  );
}
