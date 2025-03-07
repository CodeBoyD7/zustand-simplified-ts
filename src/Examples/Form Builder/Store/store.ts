import { create } from "zustand";

// Define form field type
interface FormField {
  label: string;
  type: "text" | "number" | "password" | "textarea" | "date" | "file";
}

// Define Zustand store structure
interface FormStoreState {
  formFields: FormField[];
  addField: (field: FormField) => void;
  removeField: (index: number) => void;
  resetForm: () => void;
}

// Create Zustand store
const useFormStore = create<FormStoreState>((set) => ({
  formFields: [],

  addField: (field) =>
    set((state) => ({
      formFields: [...state.formFields, field],
    })),

  removeField: (index) =>
    set((state) => ({
      formFields: state.formFields.filter((_, i) => i !== index),
    })),

  resetForm: () => set({ formFields: [] }),
}));

export default useFormStore;
