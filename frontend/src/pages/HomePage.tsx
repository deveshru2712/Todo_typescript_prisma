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
      {TodoArr.map((elem, idx) => (
        <Todo
          key={idx}
          title={elem.title}
          text={elem.text}
          createdAt={elem.createdAt}
          updatedAt={elem.updatedAt}
        />
      ))}
    </div>
  );
};

export default HomePage;
