import { useState } from "react";
import formatDate from "../utils/dateFormatter";
import EditDialog from "./EditDialog";
import { PencilLine, Trash2 } from "lucide-react";
import todoStore from "../store/todoStore";

export interface Todos {
  id: number;
  title: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const Todo = ({ id, title, text, createdAt, updatedAt }: Todos) => {
  const { deleteTodo } = todoStore();
  const [editDialogBox, SetEditDialogBox] = useState(false);
  const CreatedAt = new Date(createdAt);
  const UpdatedAt = new Date(updatedAt);

  const EditDialogBoxOpen = () => {
    SetEditDialogBox(true);
  };

  const EditDialogBoxClose = () => {
    SetEditDialogBox(false);
    console.log(false);
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  return (
    <div className="w-full border px-4 py-2 rounded-md flex flex-col gap-2 relative">
      {editDialogBox ? (
        <EditDialog
          id={id}
          title={title}
          text={text}
          onClose={EditDialogBoxClose}
        />
      ) : null}
      <h2 className="text-2xl font-semibold">{title}</h2>
      <span className="text-xl font-medium text-slate-600">{text}</span>
      <div className="text-sm font-medium">
        {createdAt && updatedAt ? (
          CreatedAt.getTime() !== UpdatedAt.getTime() ? (
            <div className="flex gap-2">
              <span>Created: {formatDate(CreatedAt)}</span>
              <span>Updated: {formatDate(UpdatedAt)}</span>
            </div>
          ) : (
            <span>Created: {formatDate(UpdatedAt)}</span>
          )
        ) : null}
      </div>
      <div className="w-full flex items-center justify-start gap-4">
        <button
          onClick={EditDialogBoxOpen}
          className="flex items-center gap-1 bg-softBlue text-white text-lg font-semibold px-2 py-1 w-fit rounded-md hover:bg-softBlue/80 active:scale-110 duration-200"
        >
          <PencilLine />
          Update
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="flex items-center gap-1  bg-red-400 text-white text-lg font-semibold px-2 py-1 w-fit rounded-md hover:bg-red-400/80 active:scale-110 duration-200"
        >
          <Trash2 /> Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
