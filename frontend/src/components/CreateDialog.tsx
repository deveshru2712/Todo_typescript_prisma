import { useEffect, useState } from "react";
import todoStore from "../store/todoStore";

interface CreateDialogProps {
  onClose: () => void;
}

const CreateDialog = ({ onClose }: CreateDialogProps) => {
  const { createTodo } = todoStore();
  const [form, setForm] = useState({
    title: "",
    text: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title cannot be empty");
      return;
    }
    createTodo(form);

    onClose();
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dialog = document.querySelector(".edit-dialog");
      if (dialog && !dialog.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="edit-dialog bg-white p-6 rounded-lg shadow-xl w-4/5 max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-lg font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title..."
              id="title"
              name="title"
              onChange={onChangeHandler}
              value={form.title}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="text" className="text-lg font-semibold mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter description..."
              id="text"
              name="text"
              onChange={onChangeHandler}
              value={form.text}
              required
              className="w-full p-2 border rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDialog;
