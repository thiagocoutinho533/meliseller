import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // <- este novo

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* ...suas outras rotas */}
    </Routes>
  );
}
