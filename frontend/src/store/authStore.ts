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
  isAuthChecking: boolean;
  signUp: (credentials: SignupCredentials) => Promise<void>;
  logIn: (credentials: LogInCredentials) => Promise<void>;
  logOut: () => Promise<void>;
  authCheck: () => Promise<void>;
}

const authStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isAuthChecking: false,
  signUp: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`/api/auth/signup`, credentials);
      console.log(response);
      set({
        user: response.data.user,
        isLoading: false,
      });
      toast.success(response.data.message);
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
      toast.success(response.data.message);
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
      const response = await axios.post("/api/auth/logout");
      set({
        user: null,
        isLoading: false,
      });
      toast.success(response.data.message);
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
  authCheck: async () => {
    set({ isAuthChecking: true });
    try {
      const response = await axios.get(`/api/auth`);
      set({
        isAuthChecking: false,
        user: response.data.user,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ isAuthChecking: false, user: null });
    }
  },
}));

export default authStore;
