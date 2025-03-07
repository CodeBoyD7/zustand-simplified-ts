import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useFormStore from "../Store/store";
import FormField from "./FormField";

interface FormData {
  [key: string]: string | FileList;
}

interface NewField {
  label: string;
  type: "text" | "number" | "password" | "textarea" | "date" | "file";
}

const FormBuilder: React.FC = () => {
  const { formFields, addField, removeField, resetForm } = useFormStore();
  const [newField, setNewField] = useState<NewField>({
    label: "",
    type: "text",
  });

  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleAddField = () => {
    if (newField.label.trim() !== "") {
      addField(newField);
      setNewField({ label: "", type: "text" });
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data Submitted:", data);

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList && value.length > 0) {
        console.log(`Uploaded File in ${key}:`, value[0].name);
      }
    });

    reset();
  };

  return (
    <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-5 text-center">
        Form Builder
      </h1>

      {/* New Field Input */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Field Label"
          value={newField.label}
          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
          className="p-2 border rounded-md flex-1"
        />
        <select
          value={newField.type}
          onChange={(e) =>
            setNewField({
              ...newField,
              type: e.target.value as NewField["type"],
            })
          }
          className="p-2 border rounded-md"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="password">Password</option>
          <option value="textarea">Textarea</option>
          <option value="date">Date</option>
          <option value="file">File</option>
        </select>
        <button
          onClick={handleAddField}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Field
        </button>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
        <div className="overflow-y-auto max-h-32 md:max-h-64">
          {formFields.map((field, index) => (
            <FormField
              key={index}
              field={field}
              index={index}
              register={register}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Submit Form
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Reset Form
        </button>
      </form>
    </div>
  );
};

export default FormBuilder;
