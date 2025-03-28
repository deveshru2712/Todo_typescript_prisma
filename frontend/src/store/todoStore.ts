import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { Todos } from "../components/Todo";

interface UpdateTodoBody {
  title: string;
  text: string;
}

interface CreateTodoBody {
  title: string;
  text: string;
}

interface TodoStore {
  TodoArr: Todos[];
  isFetching: boolean;
  getTodo: () => Promise<void>;
  createTodo: (createTodoBody: CreateTodoBody) => Promise<void>;
  updateTodo: (updateTodoBody: UpdateTodoBody, id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodoStatus: (id: number) => Promise<void>;
}

const todoStore = create<TodoStore>((set) => ({
  TodoArr: [],
  isFetching: false,
  getTodo: async () => {
    set({ isFetching: true });
    try {
      const response = await axios.get(`/api/todo`);
      set({ TodoArr: response.data.todos, isFetching: false });
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
  createTodo: async (createTodoBody) => {
    set({ isFetching: true });
    try {
      const response = await axios.post(`/api/todo`, createTodoBody);
      set((state) => ({
        TodoArr: [...state.TodoArr, response.data.todo],
        isFetching: false,
      }));
      toast.success("Todo created");
    } catch (error) {
      set({ isFetching: false });
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Unable to create todo";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  updateTodo: async (updateTodoBody, TodoId) => {
    set({ isFetching: true });
    try {
      const response = await axios.patch(`/api/todo/${TodoId}`, updateTodoBody);

      set((state) => ({
        TodoArr: state.TodoArr.map((item) =>
          item.id === TodoId ? response.data.todo : item
        ),
        isFetching: false,
      }));
      toast.success("Todo Updated");
    } catch (error) {
      set({ isFetching: false });
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Unable to update todo";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  deleteTodo: async (TodoId) => {
    set({ isFetching: true });
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.delete(`/api/todo/${TodoId}`);

      set((state) => ({
        TodoArr: state.TodoArr.filter((item) => item.id !== TodoId),
        isFetching: false,
      }));
      toast.success("Todo deleted");
    } catch (error) {
      set({ isFetching: false });
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Unable to delete todo";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  updateTodoStatus: async (TodoId) => {
    set({ isFetching: false });
    try {
      const response = await axios.patch(`/api/todo/status/${TodoId}`);
      set((state) => ({
        TodoArr: state.TodoArr.map((item) =>
          item.id === TodoId ? response.data.todo : item
        ),
      }));
      toast.success("Status updated");
    } catch (error) {
      set({ isFetching: false });
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Unable to delete todo";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
}));

export default todoStore;
