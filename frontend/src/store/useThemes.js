import { create } from "zustand";

export const useThemeStore = create((set) => ({
  currentTheme: localStorage.getItem("yapchat-theme") || "dracula",
  setTheme: (theme) => {
    localStorage.setItem("yapchat-theme", theme);
    set({ currentTheme: theme });
  },
}));
