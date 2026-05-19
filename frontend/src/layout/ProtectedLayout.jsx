import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../zustand/authStore"

const ProtectedLayout = () => {
  const isAuthenticated=useAuthStore((s)=>s.isAuthenticated)
 
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedLayout