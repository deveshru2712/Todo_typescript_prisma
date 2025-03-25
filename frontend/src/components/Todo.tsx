import formatDate from "../utils/dateFormatter";

export interface Todos {
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const Todo = ({ title, text, createdAt, updatedAt }: Todos) => {
  const CreatedAt = new Date(createdAt);
  const UpdatedAt = new Date(updatedAt);
  return (
    <div className="w-full border px-4 py-2 rounded-md flex flex-col gap-2">
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
    </div>
  );
};

export default Todo;
