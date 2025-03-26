import { useEffect } from "react";
import todoStore from "../store/todoStore";
import Todo from "../components/Todo";

const HomePage = () => {
  const { TodoArr, getTodo } = todoStore();

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-8">
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
