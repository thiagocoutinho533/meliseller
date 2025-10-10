// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // ou um spinner
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
