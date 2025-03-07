// Import necessary hooks from react-hook-form for handling form state
import { useForm } from "react-hook-form";

// Import custom state management store (probably Zustand)
import { useStore } from "../Store/store.ts";

// Define the Product interface to enforce type safety
interface Product {
  id: number;
  name: string;
  price: string;
  features: string[];
  description: string;
}

// Define the Children component
const Children = () => {
  // Destructure functions and state from the custom store
  const { products, addProduct, removeProduct, updateProduct } = useStore();

  // Initialize react-hook-form and destructure useful methods
  const {
    register, // Registers form fields for validation and state tracking
    handleSubmit, // Handles form submission
    setValue, // Sets form field values
    reset, // Resets form fields
    getValues, // Gets current form field values
    watch, // Watches for changes in form fields
    formState: { errors }, // Captures validation errors
  } = useForm<Product>(); // Define form schema based on Product interface

  // Check if the user is editing an existing product
  const editingProduct = watch("id") // If "id" exists in the form, find the matching product
    ? products.find((p) => p.id === watch("id"))
    : null; // If no "id", the user is adding a new product

  // Handle form submission
  const onSubmit = (data: Product) => {
    if (editingProduct) {
      // If editing, update the existing product
      updateProduct(data);
    } else {
      // If adding, create a new product with a unique id
      addProduct({ ...data, id: Date.now() });
    }
    reset(); // Clear the form after submission
  };

  // Function to populate the form with product data for editing
  const handleEditProduct = (product: Product) => {
    Object.keys(product).forEach((key) => {
      setValue(key as keyof Product, product[key as keyof Product]);
    });
  };

  return (
    <div className="flex justify-center items-center bg-green-100   text-green-700">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Title */}
        <h2 className="text-xl font-bold mb-6 text-center text-green-700">
          Product Book
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
          {/* Hidden input for product ID */}
          <input type="hidden" {...register("id")} />

          {/* Name Input Field */}
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* Price Input Field */}
          <input
            type="text"
            {...register("price", { required: "Price is required" })}
            className="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Price"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}

          {/* Features Input Field */}
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Press Enter to add features"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                e.preventDefault(); // Prevents the form from submitting
                const newFeature = e.currentTarget.value.trim();
                const currentFeatures = getValues("features") || [];

                // Avoid duplicate features
                if (!currentFeatures.includes(newFeature)) {
                  setValue("features", [...currentFeatures, newFeature]);
                }
                e.currentTarget.value = ""; // Clear input after adding feature
              }
            }}
          />
          {/* Display selected features */}
          <p className="text-gray-600">
            Features: {watch("features")?.join(", ")}
          </p>

          {/* Description Input Field */}
          <input
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-2 border rounded-lg border-gray-300"
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white ${
                editingProduct
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {/* Button text changes based on editing or adding */}
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>

        {/* Product List */}
        <ul className="space-y-4 overflow-auto">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-4 bg-green-50 rounded-lg shadow-sm"
            >
              {/* Display Product Information */}
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-2">Price: {product.price}</p>
              <p className="text-gray-600 mb-2">
                Features: {product.features.join(", ")}
              </p>
              <p className="text-gray-600 mb-2">
                Description: {product.description}
              </p>

              {/* Edit & Delete Buttons */}
              <div className="flex justify-between">
                {/* Edit Button */}
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => removeProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export the component
export default Children;
