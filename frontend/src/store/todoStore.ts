import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { Todos } from "../components/Todo";

interface TodoStore {
  TodoArr: Todos[];
  isFetching: boolean;
  getTodo: () => Promise<void>;
  createTodo: () => Promise<void>;
  updateTodo: () => Promise<void>;
  deleteTodo: () => Promise<void>;
}

const todoStore = create<TodoStore>((set) => ({
  TodoArr: [],
  isFetching: false,
  getTodo: async () => {
    set({ isFetching: true });
    try {
      const response = await axios.get(`/api/todo`);
      set({ TodoArr: response.data.notes, isFetching: false });
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Unable to fetch todo's";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  createTodo: async () => {},
  updateTodo: async () => {},
  deleteTodo: async () => {},
}));

export default todoStore;
