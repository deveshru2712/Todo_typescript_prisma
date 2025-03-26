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
    } catch (error) {
      set({ isFetching: false });
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Unable to fetch todo's";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  deleteTodo: async () => {},
}));

export default todoStore;
