import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface User {
  id: number;
  username: string;
  email: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LogInCredentials {
  email: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  signUp: (credentials: SignupCredentials) => Promise<void>;
  logIn: (credentials: LogInCredentials) => Promise<void>;
  logOut: () => Promise<void>;
}

const authStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  signUp: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/auth/signup`, credentials);
      set({
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        isLoading: false,
      });
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Signup failed";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  logIn: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/auth/login`, credentials);
      set({
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        isLoading: false,
      });
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Login failed";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  logOut: async () => {
    set({ isLoading: true });
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post("/api/auth/logout");
      set({
        user: null,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Logout failed";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
}));

export default authStore;
