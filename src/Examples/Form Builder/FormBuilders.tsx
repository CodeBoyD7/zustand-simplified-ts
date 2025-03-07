import FormBuilder from "./components/FormBuilder";

const FormBuilders: React.FC = () => {
  return (
    <div className="bg-black h-[70vh]   flex flex-col lg:flex-row gap-10 p-6 lg:p-10 justify-center items-center">
      <FormBuilder />
    </div>
  );
};

export default FormBuilders;
