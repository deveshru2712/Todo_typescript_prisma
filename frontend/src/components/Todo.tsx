import React from "react";

interface TodoProps {
  title: string;
  text: string;
  //   completed: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
}

const Todo = ({ title, text }: TodoProps) => {
  return (
    <div className="w-full border px-4 py-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <span className="text-lg font-medium text-slate-400">{text}</span>
    </div>
  );
};

export default Todo;
