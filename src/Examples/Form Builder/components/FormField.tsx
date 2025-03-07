import { UseFormRegister } from "react-hook-form";
import useFormStore from "../Store/store.ts";

interface FormFieldProps {
  field: {
    label: string;
    type: "text" | "number" | "password" | "textarea" | "date" | "file";
  };
  index: number;
  register: UseFormRegister<any>;
}

const FormField: React.FC<FormFieldProps> = ({ field, index, register }) => {
  const { removeField } = useFormStore();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 font-medium">{field.label}</label>

      {field.type === "textarea" ? (
        <textarea
          {...register(field.label)}
          className="border p-2 rounded-md w-full"
        />
      ) : field.type === "file" ? (
        <input
          type="file"
          {...register(field.label)}
          className="border p-2 rounded-md w-full"
        />
      ) : (
        <input
          type={field.type}
          {...register(field.label)}
          className="border p-2 rounded-md w-full"
        />
      )}

      <button
        type="button"
        onClick={() => removeField(index)}
        className="text-red-500 hover:underline text-sm"
      >
        Remove
      </button>
    </div>
  );
};

export default FormField;
