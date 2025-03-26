import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { Todos } from "../components/Todo";

interface UpdateTodoBody {
  title: string;
  text: string;
}

interface TodoStore {
  TodoArr: Todos[];
  isFetching: boolean;
  getTodo: () => Promise<void>;
  createTodo: () => Promise<void>;
  updateTodo: (updateTodoBody: UpdateTodoBody, id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
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
  updateTodo: async (updateTodoBody: UpdateTodoBody, TodoId: number) => {
    set({ isFetching: true });
    try {
      const response = await axios.patch(`/api/todo/${TodoId}`, updateTodoBody);

      set((state) => ({
        TodoArr: state.TodoArr.map((item) =>
          item.id === TodoId ? response.data.note : item
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
  deleteTodo: async (TodoId: number) => {
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
}));

export default todoStore;
