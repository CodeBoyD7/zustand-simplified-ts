import Children from "./Components/Children";

const Product = () => {
  return (
    <div className="bg-black h-[70vh]   flex flex-col lg:flex-row gap-10 p-6 lg:p-10 justify-center items-center">
      <Children />
    </div>
  );
};
export default Product;
