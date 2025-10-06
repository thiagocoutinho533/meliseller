import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();

  if (loading) return null; // ou um spinner

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
