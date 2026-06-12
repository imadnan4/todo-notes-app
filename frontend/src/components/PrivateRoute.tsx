import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}
