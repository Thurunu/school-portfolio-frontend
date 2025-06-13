import { useState } from "react";

export const useFormData = (fields, showImageUpload, allowMultipleImages) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach((field) => {
      if (field.type === "file") {
        initialData[field.name] = null;
      } else if (field.type === "select") {
        initialData[field.name] = field.defaultValue || "";
      } else {
        initialData[field.name] = "";
      }
    });

    if (showImageUpload) {
      if (allowMultipleImages) {
        initialData.selectedImages = [];
        initialData.imagePreviews = [];
        initialData.imagesBase64 = [];
      } else {
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

  const resetForm = () => {
  const initialData = {};
  fields.forEach((field) => {
    if (field.type === "file") {
      initialData[field.name] = null;
    } else if (field.type === "select") {
      initialData[field.name] = field.defaultValue || "";
    } else {
      initialData[field.name] = "";
    }
  });

  if (showImageUpload) {
    if (allowMultipleImages) {
      initialData.selectedImages = [];
      initialData.imagePreviews = [];
      initialData.imagesBase64 = [];
    } else {
      initialData.selectedImage = null;
      initialData.imagePreview = "";
      initialData.imageBase64 = "";
    }
  }

  setFormData(initialData);
};

  return { formData, setFormData, handleInputChange, resetForm };
};
