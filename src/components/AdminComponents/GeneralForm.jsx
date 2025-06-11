import { init } from "aos";
import React, { useState } from "react";
import axios from "axios";

const GeneralForm = (props) => {
  const {
    title,
    fields,
    onSubmit,
    submitButtonText = "Submit",
    showDateTime = false,
    showImageUpload = true,
    allowMultipleImages = false, // New parameter for multiple images
  } = props;

  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach((field) => {
      if (field.type === "file") {
        initialData[field.name] = null;
      } else if (field.type === "select") {
        // Initialize dropdown with default value or empty string
        initialData[field.name] = field.defaultValue || "";
      } else {
        initialData[field.name] = "";
      }
    });

    if (showImageUpload) {
      if (allowMultipleImages) {
        // For multiple images
        initialData.selectedImages = [];
        initialData.imagePreviews = [];
        initialData.imagesBase64 = [];
      } else {
        // For single image (existing functionality)
        initialData.selectedImage = null;
        initialData.imagePreview = "";
        initialData.imageBase64 = "";
      }
    }

    return initialData;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (allowMultipleImages) {
      // Handle multiple images
      const fileArray = Array.from(files);
      const imagePromises = fileArray.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              file: file,
              preview: reader.result,
              base64: reader.result,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((results) => {
        setFormData((prev) => ({
          ...prev,
          selectedImages: [
            ...(prev.selectedImages || []),
            ...results.map((r) => r.file),
          ],
          imagePreviews: [
            ...(prev.imagePreviews || []),
            ...results.map((r) => r.preview),
          ],
          imagesBase64: [
            ...(prev.imagesBase64 || []),
            ...results.map((r) => r.base64),
          ],
        }));
      });
    } else {
      // Handle single image (existing functionality)
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            selectedImage: file,
            imagePreview: reader.result,
            imageBase64: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index) => {
    if (allowMultipleImages) {
      setFormData((prev) => ({
        ...prev,
        selectedImages: prev.selectedImages.filter((_, i) => i !== index),
        imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
        imagesBase64: prev.imagesBase64.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const formatDateTime = () => {
    const dateField = fields.find((f) => f.type === "date");
    const timeField = fields.find((f) => f.type === "time");

    if (
      dateField &&
      timeField &&
      formData[dateField.name] &&
      formData[timeField.name]
    ) {
      const date = new Date(
        formData[dateField.name] + "T" + formData[timeField.name]
      );
      return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  };

  const renderField = (field) => {
    const commonClasses =
      "w-full px-3 py-2 border rounded-lg bg-primary/50 text-white focus:border-primary focus:outline-none";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            rows={field.rows || 4}
            placeholder={field.placeholder}
            className={`${commonClasses} resize-vertical`}
            required={field.required}
          />
        );
      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            className={commonClasses}
            required={field.required}
          >
            {/* Default empty option */}
            <option value="" disabled>
              {field.placeholder || "Select an option"}
            </option>
            {/* Render options from field.options array */}
            {field.options?.map((option, index) => {
              // console.log("Option:", field.options);
              const value = typeof option === "object" ? option.value : option;
              const label = typeof option === "object" ? option.label : option;
              return (
                <option key={index} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        );
      default:
        return (
          <input
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            type={field.type}
            placeholder={field.placeholder}
            className={commonClasses}
            required={field.required}
          />
        );
    }
  };

  return (
    <div className="max-w-full w-full mx-auto p-6 rounded-lg border border-primary">
      <h2 className="text-2xl text-black font-bold mb-6 text-center">
        {title}
      </h2>

      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              className="block text-black text-sm font-semibold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            {renderField(field)}
          </div>
        ))}

        {/* DateTime Display */}
        {showDateTime && formatDateTime() && (
          <div className="mb-4 p-3 bg-primary/50 rounded-lg">
            <label className="block text-white text-sm font-semibold mb-2">
              Selected Date & Time:
            </label>
            <div className="text-white text-sm">{formatDateTime()}</div>
          </div>
        )}

        {/* Image Upload */}
        {showImageUpload && (
          <>
            <div className="mb-4">
              <label
                className="block text-primary text-sm font-semibold mb-2"
                htmlFor="imageUpload"
              >
                {allowMultipleImages ? "Images" : "Image"}
              </label>
              <input
                id="imageUpload"
                name="imageUpload"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border rounded-lg bg-primary/50 text-white focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                type="file"
                accept="image/*"
                multiple={allowMultipleImages}
              />

              {/* Display selected files info */}
              {allowMultipleImages
                ? formData.selectedImages &&
                  formData.selectedImages.length > 0 && (
                    <div className="mt-2 text-green-400 text-sm">
                      Selected: {formData.selectedImages.length} image(s)
                    </div>
                  )
                : formData.selectedImage && (
                    <div className="mt-2 text-green-400 text-sm">
                      Selected: {formData.selectedImage.name}
                    </div>
                  )}
            </div>

            {/* Image Previews */}
            {allowMultipleImages
              ? // Multiple image previews
                formData.imagePreviews &&
                formData.imagePreviews.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2">
                      Image Previews:
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className="relative border rounded-lg p-2 bg-gray-700"
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                          <div className="text-xs text-gray-300 mt-1 truncate">
                            {formData.selectedImages[index]?.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              : // Single image preview (existing functionality)
                formData.imagePreview && (
                  <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2">
                      Image Preview:
                    </label>
                    <div className="border rounded-lg p-2 bg-gray-700">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  </div>
                )}
          </>
        )}

        {/* Submit Button */}
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
