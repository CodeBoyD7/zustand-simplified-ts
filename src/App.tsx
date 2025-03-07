import { useState } from "react";
import Counter from "./Examples/Counter/Parent";
import FormBuilders from "./Examples/Form Builder/FormBuilders";
import Product from "./Examples/Products/Product";
import TodoList from "./Examples/Todo List/TodoList";

const App = () => {
  const allComponents = [
    <Counter />,
    <Product />,
    <FormBuilders />,
    <TodoList />,
  ];
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % allComponents.length);
  };

  const handleBack = () => {
    setIndex(
      (prevIndex) =>
        (prevIndex - 1 + allComponents.length) % allComponents.length
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-900 p-4">
      <div className=" p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        {allComponents[index]}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
