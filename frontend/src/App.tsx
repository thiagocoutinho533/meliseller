import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // arquivo 'Login.tsx' com L maiúsculo

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />   {/* <- minúsculo */}
      {/* outras rotas... */}
    </Routes>
  );
}
