import Children from "./components/Children";

const TodoList = () => {
  return (
    <div className="bg-black h-[70vh]  text-white flex flex-col lg:flex-row gap-10 p-6 lg:p-10 justify-center items-center">
      <Children />
    </div>
  );
};

export default TodoList;
