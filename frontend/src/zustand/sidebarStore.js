// src/store/authStore.js
import { create } from "zustand"

export const useSidebarStore = create((set) => ({
  isToggled: false,    // mobile open/close
  isCollapsed: false,  // desktop collapse

  //  mobile
  toggleMobile: () =>
    set((state) => ({
      isToggled: !state.isToggled,
      isCollapsed:false
    })),

  closeMobile: () =>
    set({
      isToggled: false,
    }),

  //  desktop
  toggleCollapse: () =>
    set((state) => ({
      isCollapsed: !state.isCollapsed,
    })),
}))
