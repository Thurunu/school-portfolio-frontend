import React from "react";
import { useFormData } from "./hooks/useForm";
import { useImageUpload } from "./hooks/useImageUpload";
import FormField from "./GeneralFormComponents/FormField";
import DateTimeDisplay from "./GeneralFormComponents/DateTimeDisplay";
import ImageUpload from "./GeneralFormComponents/ImageUpload";

const GeneralForm = ({
  title,
  fields,
  onSubmit,
  submitButtonText = "Submit",
  showDateTime = false,
  showImageUpload = true,
  allowMultipleImages = false,
}) => {
  const { formData, setFormData, handleInputChange, resetForm } = useFormData(
    fields,
    showImageUpload,
    allowMultipleImages
  );

  const { handleImageChange, removeImage } = useImageUpload(
    allowMultipleImages,
    setFormData
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData, resetForm);
  };

  return (
    <div className="max-w-full w-full mx-auto p-6 rounded-lg border border-primary">
      <h2 className="text-2xl text-primary font-bold mb-6 text-center">
        {title}
      </h2>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={handleInputChange}
          />
        ))}

        {showDateTime && (
          <DateTimeDisplay fields={fields} formData={formData} />
        )}

        {showImageUpload && (
          <ImageUpload
            allowMultipleImages={allowMultipleImages}
            formData={formData}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
          />
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold px-4 py-3 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};
export default GeneralForm;