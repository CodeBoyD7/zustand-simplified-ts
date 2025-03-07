import { useCounter } from "../Store/store.js";

const Children = () => {
  const { increment, decrement } = useCounter();
  return (
    <div>
      <div className=" flex justify-between gap-5">
        <div>
          <button
            className="outline-none border border-white rounded-lg px-3 py-1"
            onClick={increment}
          >
            increment
          </button>
        </div>
        <div>
          <button
            className="outline-none border border-white rounded-lg px-3 py-1"
            onClick={decrement}
          >
            decrement
          </button>
        </div>
      </div>
    </div>
  );
};
export default Children;
