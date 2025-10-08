import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h3>Rota não encontrada</h3>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* ✅ Login principal */}
      <Route path="/login" element={<Login />} />
      {/* ✅ Rota padrão */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
