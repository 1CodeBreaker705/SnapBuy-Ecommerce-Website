// src/store/authStore.js
import { create } from "zustand"
import { axiosClient } from "../utils/axiosClient"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  fetchUserDetails: async () => {
    try {
      const res = await axiosClient.get("/auth/profile")
      set({
        user: res.data,
        isAuthenticated: true,
        loading: false
      })
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        loading: false
      })
    }
  },

  logout: async () => {
    set({
      user: null,
      isAuthenticated: false,
    })
    await axiosClient.post("/auth/logout")
    toast.success('Logout successfull')
  },
}))
