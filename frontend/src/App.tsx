import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // nome do arquivo com L maiúsculo

function NotFound() {
  return <div style={{ padding: 24 }}>Rota não encontrada</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} /> {/* fallback útil para diagnosticar */}
    </Routes>
  );
}
