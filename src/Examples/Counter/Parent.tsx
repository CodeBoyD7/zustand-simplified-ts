import Children from "./Components/Children";
import { useCounter } from "./Store/store";

const Counter = () => {
  const { count } = useCounter();
  return (
    <div className="bg-black h-[70vh]  text-white flex flex-col lg:flex-row gap-10 p-6 lg:p-10 justify-center items-center">
      {/* Parent Component */}
      <div className="w-full max-w-md sm:max-w-lg lg:w-[40vw] lg:h-[40vh] bg-slate-800 rounded-lg flex flex-col justify-center items-center gap-6 p-6">
        <div className="text-2xl sm:text-3xl">Parent Component</div>
        <div className="text-5xl sm:text-7xl lg:text-[80px]">
          Count: {count}
        </div>
      </div>

      {/* Child Component */}
      <div className="w-full max-w-md sm:max-w-lg lg:w-[40vw] lg:h-[40vh] bg-slate-800 rounded-lg flex flex-col justify-center items-center gap-6 p-6">
        <div className="text-2xl sm:text-3xl">Child Component</div>
        <Children />
      </div>
    </div>
  );
};

export default Counter;
