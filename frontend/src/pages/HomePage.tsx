import { useEffect, useState } from "react";
import { PenLine } from "lucide-react";
import todoStore from "../store/todoStore";
import Todo from "../components/Todo";
import CreateDialog from "../components/CreateDialog";

const HomePage = () => {
  const { TodoArr, getTodo } = todoStore();
  const [createDialogBox, setCreateDialogBox] = useState(false);

  const openCreateDialogBox = () => {
    setCreateDialogBox(true);
  };

  const closeCreateDialogBox = () => {
    setCreateDialogBox(false);
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-8">
      <div className="w-full flex justify-start">
        <button
          onClick={openCreateDialogBox}
          className="flex items-center gap-1 bg-softBlue text-white text-lg font-semibold px-2 py-1 w-fit rounded-md hover:bg-softBlue/80 active:scale-110 duration-200"
        >
          <PenLine /> Create
        </button>
      </div>

      {createDialogBox && <CreateDialog onClose={closeCreateDialogBox} />}

      {TodoArr.map((elem) => (
        <div key={elem.id} className="h-fit w-full">
          <Todo
            id={elem.id}
            title={elem.title}
            text={elem.text}
            completed={elem.completed}
            createdAt={elem.createdAt}
            updatedAt={elem.updatedAt}
          />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
