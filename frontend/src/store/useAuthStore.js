import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore.js";
import { io } from "socket.io-client";

const BASE_URL = "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,
  login: async (userInfo) => {
    try {
      const response = await axiosInstance.post("/auth/login", userInfo);
      set({ authUser: response.data });
      toast.success(response.data.message);
      useChatStore.getState().resetChatStore();
      console.log(useChatStore.getState().messages);
      useChatStore.getState().logChatStore();
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  signUp: async (userInfo) => {
    try {
      const response = await axiosInstance.post("/auth/signup", userInfo);
      set({ authUser: response.data });
      toast.success(response.data.message);
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      toast.success("Welcome Back!😃");
      get().connectSocket();
    } catch (error) {
      toast.success("Welcome to yapChat, please login to start chatting");
      console.log(
        `Error in checkAuth frontend`,
        error?.respones?.data?.message
      );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(response.data.message);
      useChatStore.getState().resetChatStore();
      console.log(useChatStore.getState().messages);
      get().disconnectSocket();
    } catch (error) {
      console.log(error?.response?.data.message);
      toast.error(error?.response?.data.message);
    }
  },
  updateProfile: async (profilepic) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put(
        "/auth/profile-update",
        profilepic
      );
      set({ authUser: response.data });
      toast.success(response.data.message);
    } catch (error) {
      console.log(`Error in updateProfile store`, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
