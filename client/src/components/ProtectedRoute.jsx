import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  // Wait until AuthContext finishes restoring state
  if (loading) {
    return null; // or a spinner component
  }

  // No token means not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}