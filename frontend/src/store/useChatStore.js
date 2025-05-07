import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance.js";
import { toast } from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  users: [],
  isMessagesLoading: false,
  isLoadingUsers: false,
  isSidebarOpen: true,
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },

  getUsers: async () => {
    try {
      set({ isLoadingUsers: true });
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data, isLoadingUsers: false });
    } catch (error) {
      console.error(error.response?.data?.message);
      set({ isLoadingUsers: false });
    } finally {
      set({ isLoadingUsers: false });
    }
  },
  getMessages: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const response = await axiosInstance.get(`/message/${userId}`);
      console.log(response.data);
      set({ messages: response.data });
    } catch (error) {
      set({ isMessagesLoading: false });
      console.error(error.response?.data?.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    try {
      const { selectedUser } = get();
      console.log(selectedUser);
      console.log(messageData);
      const response = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set((state) => ({
        messages: [...state.messages, response.data],
      }));
    } catch (error) {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
  resetChatStore: () => {
    set({ selectedUser: null, messages: [], users: [] });
  },
  // this function is for debugging only
  logChatStore: () => {
    const { selectedUser, messages, users } = get();
    console.log(selectedUser, messages, users);
  },
}));
