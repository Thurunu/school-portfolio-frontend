import React, { useState } from "react";
import axios from "axios";
import GeneralForm from "./GeneralForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const GalleryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();
  const GalleryFields = [
    {
      name: "galleryName",
      label: "Gallery Name",
      type: "text",
      placeholder: "Enter gallery name",
      required: true,
    },
    {
      name: "galleryDescription",
      label: "Gallery Description",
      type: "textarea",
      placeholder: "Write gallery description",
      rows: 8,
      required: true,
    },
  ];

  const galleryFeedDataModel = [
    { frontendKey: "galleryName", backendKey: "title" },
    { frontendKey: "galleryDescription", backendKey: "desc" },
  ];

  const handleGallerySubmit = async (formData) => {
    // console.log("Gallery Form Data:", formData);
    const url = "http://localhost:3000/api/gallery/upload";

    const payload = {};
    galleryFeedDataModel.forEach(({ frontendKey, backendKey }) => {
      // console.log(
      //   "Mapping correct or not: ",
      //   formData.hasOwnProperty(frontendKey)
      // );
      // console.log("Mapping: ", frontendKey, " to ", backendKey);
      if (formData.hasOwnProperty(frontendKey)) {
        payload[backendKey] = formData[frontendKey];
      }
      // console.log("Payload after mapping: ", payload);
    });

    if (formData.imagesBase64 && Array.isArray(formData.imagesBase64)) {
      payload.imagePaths = formData.imagesBase64;
    }

    try {
      const response = await axios.post(url, payload);
      // console.log("Success:", response.data);

      showSuccess(
        "Gallery Created Successfully!",
        "Your gallery has been created successfully."
      );
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      showError(
        "Failed to Create Gallery",
        "There was an error publishing your gallery. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <GeneralForm
        title="Create Gallery"
        fields={GalleryFields}
        onSubmit={handleGallerySubmit}
        submitButtonText="Create Gallery"
        showDateTime={false}
        showImageUpload={true}
        allowMultipleImages={true}
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
