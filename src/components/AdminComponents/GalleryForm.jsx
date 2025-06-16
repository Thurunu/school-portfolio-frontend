import React, { useState } from "react";
import axios from "axios";
import GeneralForm from "./GeneralForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const GalleryForm = ({ initialData, onSubmit, submitButtonText = "Create Gallery" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();
  const galleryFields = [
    {
      name: "galleryTitle",
      label: "Gallery Title",
      type: "text",
      placeholder: "Enter gallery title",
      required: true,
    },
    {
      name: "galleryDescription",
      label: "Gallery Description",
      type: "textarea",
      placeholder: "Enter gallery description",
      rows: 4,
      required: true,
    },
  ];

  const galleryDataModel = [
    { frontendKey: "galleryTitle", backendKey: "title" },
    { frontendKey: "galleryDescription", backendKey: "desc" },
    { frontendKey: "imageBase64", backendKey: "img" },
  ];

  const handleGallerySubmit = async (formData) => {
    if (onSubmit) {
      // If onSubmit is provided (for update), use it
      onSubmit(formData);
      return;
    }

    // Otherwise, handle create operation
    const url = "http://localhost:3000/api/gallery/create";
    const payload = {};
    galleryDataModel.forEach(({ frontendKey, backendKey }) => {
      if (formData.hasOwnProperty(frontendKey)) {
        payload[backendKey] = formData[frontendKey];
      }
    });

    try {
      setIsSubmitting(true);
      const response = await axios.post(url, payload);
      showSuccess(
        "Gallery Created Successfully!",
        "Your gallery has been created successfully."
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      showError(
        "Failed to Create Gallery",
        "There was an error creating your gallery. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Transform initialData to match form field names
  const getInitialFormData = () => {
    if (!initialData) return {};

    return {
      galleryTitle: initialData.title || "",
      galleryDescription: initialData.desc || "",
      imageBase64: initialData.img || "",
    };
  };

  return (
    <>
      <GeneralForm
        title={submitButtonText}
        fields={galleryFields}
        onSubmit={handleGallerySubmit}
        submitButtonText={submitButtonText}
        showImageUpload={true}
        initialData={getInitialFormData()}
      />

      <Popup
        isVisible={popupConfig.isVisible}
        onClose={hidePopup}
        type={popupConfig.type}
        title={popupConfig.title}
        message={popupConfig.message}
        autoClose={popupConfig.autoClose}
        autoCloseDelay={popupConfig.autoCloseDelay}
        showCloseButton={popupConfig.showCloseButton}
      />
    </>
  );
};

export default GalleryForm;
