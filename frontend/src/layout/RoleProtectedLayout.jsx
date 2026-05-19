import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../zustand/authStore"

const RoleProtectedLayout = ({ role }) => {

  const user = useAuthStore((s) => s.user)

  if (user?.role !== role) {
    return <Navigate to="/" replace />
  }

  return <Outlet/>
}

export default RoleProtectedLayout